const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const createHttpError = require("http-errors");
const User = require("../models/user.model");
const sequelize = require("../configs/db.config");
const Contact = require("../models/contact.model");
const authMessages = require("../constants/auth.messages");
const hashPassword = require("../utils/hashPassword");

class AuthService {
    #User;
    #Contact;

    constructor() {
        autoBind(this);

        this.#User = User;
        this.#Contact = Contact;
    }

    async registrationUser(user) {
        user.hashedPassword = await hashPassword(user.password);
        delete user.password;

        const result = await sequelize.transaction(async t => {            
            const existingUser = await this.#User.findOne({
                where: {
                    username: user.username
                },
                include: [{
                    model: this.#Contact,
                    required: true,
                    where: {
                        [Op.or]: [
                            { phoneNumber: user.phoneNumber },
                            { email: user.email }
                        ]
                    }
                }],
                transaction: t
            });
            
            if (existingUser) {
                throw createHttpError.BadRequest(authMessages.UserAlreadyExists);
            }
            
            const newUser = await this.#User.create(user, {
                fields: ["username", "hashedPassword", "firstName", "lastName"],
                transaction: t
            });

            await this.#Contact.create({
                userId: newUser.id,
                phoneNumber: user.phoneNumber,
                email: user.email
            }, {
                transaction: t
            });

            return true;
        });

        return result;
    }
}

module.exports = new AuthService();