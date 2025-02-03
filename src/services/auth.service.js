const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const sequelize = require("../configs/sequelize.config");
const Contact = require("../models/contact.model");
const authMessages = require("../constants/auth.messages");
const { hashPassword, verifyPassword } = require("../utils/auth.utils");
const { registrationValidator } = require("../validators/auth.validators");
const { getUserByIdentifier } = require("./user.service");
const redisClient = require("../configs/redis.config");

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
        console.log(redisClient);
        
        const refreshToken = await this.#generateRefreshToken(user);
        const accessToken = await this.#generateAccessToken(user);
        
        return {
            refreshToken,
            accessToken
        };
    }

    async #generateRefreshToken(user) {
        const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
        let expirationTime = 20 * 24 * 3600; // 20 days in seconds
        const payload = {
            username: user.username
        }

        const refreshToken = jwt.sign(payload, jwtRefreshSecretKey, { expiresIn: expirationTime });
        return refreshToken;
    }

    async #generateAccessToken(user) {
        const payload = {
            username: user.username
        }

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: "1h" });
        return accessToken;
    }
}

module.exports = new AuthService();