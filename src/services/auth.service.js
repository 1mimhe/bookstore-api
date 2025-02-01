const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const sequelize = require("../configs/db.config");
const Contact = require("../models/contact.model");
const authMessages = require("../constants/auth.messages");
const { hashPassword, verifyPassword } = require("../utils/auth.utils");
const { registrationValidator } = require("../validators/auth.validators");
const { getUserByIdentifier } = require("./user.service");
const redisClient = require("../configs/redis.config");
const { attribute } = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js");

class AuthService {
    #User;
    #Contact;

    constructor() {
        autoBind(this);

        this.#User = User;
        this.#Contact = Contact;
    }

    async registrationUser(user) {
        const validate = registrationValidator();
        const isValid = validate(user);
        if (!isValid) throw createHttpError.BadRequest(validate.errors);

        user.hashedPassword = await hashPassword(user.password);
        delete user.password;

        const whereClause = [{ username: user.username }];
        if (user?.email) whereClause.push({ '$contact.email$': user.email });
        if (user?.phoneNumber) whereClause.push({ '$contact.phoneNumber$': user.phoneNumber });

        const result = await sequelize.transaction(async t => {
            const existingUser = await this.#User.count({
                where: {
                    [Op.or]: whereClause
                },
                include: [{
                    model: this.#Contact
                }]
            });

            if (existingUser > 0) {
                throw createHttpError.BadRequest(authMessages.UserAlreadyExists);
            }

            const newUser = await this.#User.create(user, {
                fields: ["username", "hashedPassword", "firstName", "lastName"],
                transaction: t
            });

            if (user.phoneNumber || user.email) {
                await this.#Contact.create({
                    userId: newUser.id,
                    phoneNumber: user.phoneNumber,
                    email: user.email
                }, {
                    transaction: t
                });
            }

            return true;
        });

        return result;
    }

    async loginUser({ identifier, password }) {
        const user = await getUserByIdentifier(identifier);
        
        if (!user) {
            throw createHttpError.BadRequest(authMessages.InvalidCredentials);
        }

        const isCorrectPassword = await verifyPassword(password, user.hashedPassword);        
        if (!isCorrectPassword) {
            throw createHttpError.BadRequest(authMessages.InvalidCredentials);
        }

        const refreshToken = await this.#generateRefreshToken(user);
        const accessToken = await this.#generateAccessToken(user);
        
        return {
            refreshToken,
            accessToken
        };
    }

    async #generateRefreshToken(user) {
        const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
        const userKey = `user:${user.id}`;
        const isAuthorizedBefore = await redisClient.EXISTS(userKey);

        let expirationTime = 20 * 24 * 3600; // 20 days in seconds
        if (isAuthorizedBefore) {
            const { refreshToken: oldRefreshToken } = await redisClient.HGETALL(userKey);
            const decodedOldRefreshToken = jwt.verify(oldRefreshToken, jwtRefreshSecretKey);
            expirationTime = decodedOldRefreshToken.exp - Math.floor(Date.now() / 1000);
        }

        const payload = {
            username: user.username
        }
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: expirationTime });

        await redisClient.HSET(userKey, "refreshToken", refreshToken);
        await redisClient.EXPIRE(userKey, expirationTime);

        return refreshToken;
    }

    async #generateAccessToken(user) {
        const payload = {
            username: user.username
        }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: "1h" });
        return accessToken;
    }

    async refreshTokens(refreshToken) {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

        const user = await getUserByIdentifier(decodedRefreshToken.username);
        if (!user) throw createHttpError.BadRequest(authMessages.InvalidRefreshToken);

        const userKey = `user:${user.id}`;
        const isAuthorizedBefore = await redisClient.EXISTS(userKey);
        if (!isAuthorizedBefore) throw createHttpError.BadRequest(authMessages.InvalidRefreshToken);

        const accessToken = await this.#generateAccessToken(user);
        const newRefreshToken = await this.#generateRefreshToken(user);

        return {
            accessToken,
            refreshToken: newRefreshToken 
        }
    }
}

module.exports = new AuthService();