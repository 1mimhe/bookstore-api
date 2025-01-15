const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const createHttpError = require("http-errors");
const User = require("../models/user.model");
const sequelize = require("../configs/db.config");
const Contact = require("../models/contact.model");
const authMessages = require("../constants/auth.messages");
const { hashPassword } = require("../utils/auth.utils");
const { registrationValidator } = require("../validators/auth.validators");

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
        if (user?.email) whereClause.push({ '$Contact.email$': user.email });
        if (user?.phoneNumber) whereClause.push({ '$Contact.phoneNumber$': user.phoneNumber });

        const result = await sequelize.transaction(async t => {
            const existingUser = await this.#User.findOne({
                where: {
                    [Op.or]: whereClause
                },
                include: [{
                    model: this.#Contact,
                    required: true
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