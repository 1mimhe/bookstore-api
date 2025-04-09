const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../db/models/user.model");
const Contact = require("../db/models/contact.model");
const Role = require("../db/models/role.model");
const sequelize = require("../config/sequelize.config");
const authMessages = require("../constants/auth.messages");
const { hashPassword, verifyPassword } = require("../utils/auth.utils");
const { registrationValidator } = require("../validators/auth.validators");
const { getUserByIdentifier } = require("./user.service");

class AuthService {
    #User;
    #Contact;
    #Role;

    constructor() {
        autoBind(this);

        this.#User = User;
        this.#Contact = Contact;
        this.#Role = Role;
    }

    async registrationUser(userDTO, roles = ['customer']) {
        const validate = registrationValidator();
        const isValid = validate(userDTO);
        if (!isValid) throw createHttpError.BadRequest(validate.errors);

        userDTO.hashedPassword = await hashPassword(userDTO.password);
        delete userDTO.password;

        const result = await sequelize.transaction(async t => {
            const user = await this.#User.create(userDTO, {
                fields: ["username", "hashedPassword", "firstName", "lastName"],
                transaction: t
            });

            let contact;
            if (userDTO.phoneNumber || userDTO.email) {
                await this.#Contact.create({
                    userId: user.id,
                    phoneNumber: userDTO.phoneNumber,
                    email: userDTO.email
                }, {
                    transaction: t
                });
            }

            roles = roles.map(role => {
                return { name: role, userId: user.id };
            });
            await this.#Role.bulkCreate(roles, {
                fields: ["name", "userId"],
                transaction: t
            });

            return {
                user, contact, roles
            };
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

        const refreshToken = await this.#generateRefreshToken({ username: user.username });
        const accessToken = await this.#generateAccessToken({ username: user.username });

        return {
            refreshToken,
            accessToken,
            userId: user.id
        };
    }

    async #generateRefreshToken(payload, expiresIn = 604_800) {
        expiresIn = expiresIn > 604_800 ? 604_800 : expiresIn;

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn });
        return refreshToken;
    }

    async #generateAccessToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: "20min" });
        return accessToken;
    }

    async refreshTokens(session, oldRefreshToken, expirationTime) {
        if (session?.refreshToken && oldRefreshToken 
            && session?.refreshToken === oldRefreshToken) {
            const username = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET_KEY).username;
            const newRefreshToken = await this.#generateRefreshToken({ username }, Math.trunc(expirationTime / 1000));
            const newAccessToken = await this.#generateAccessToken({ username });

            session.refreshToken = newRefreshToken;
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            };
        } else throw createHttpError.Unauthorized(authMessages.InvalidRefreshToken);
    }
}

module.exports = new AuthService();