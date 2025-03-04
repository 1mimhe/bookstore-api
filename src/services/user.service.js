const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const { User, Contact } = require("../db/models/associations");

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
                    { '$contact.email$': identifier },
                    { '$contact.phoneNumber$': identifier },
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