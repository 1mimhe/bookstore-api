const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const User = require("../models/user.model");
const Contact = require("../models/contact.model");

class UserService {
    #User;
    #Contact;

    constructor() {
        autoBind(this);

        this.#User = User;
        this.#Contact = Contact;
    }
 
    async getUserByIdentifier(identifier) {
        return await this.#User.findOne({
            where: {
                [Op.or]: [
                    { username: identifier },
                    { '$Contact.email$': identifier },
                    { '$Contact.phoneNumber$': identifier },
                ]
            },
            include: [{
                model: this.#Contact
            }],
            raw: true
        });
    }
}

module.exports = new UserService();