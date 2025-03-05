const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const User = require("../db/models/user.model");
const Contact = require("../db/models/contact.model");
const Address = require("../db/models/address.model");
const { userAddressValidator } = require("../validators/user.validators");
const createHttpError = require("http-errors");

class UserService {
    #User;
    #Contact;
    #Address;

    constructor() {
        autoBind(this);

        this.#User = User;
        this.#Contact = Contact;
        this.#Address = Address;
    }
 
    async getUserByIdentifier(identifier, exclude = []) {
        return (await this.#User.findOne({
            subQuery: false,
            where: {
                [Op.or]: [
                    { username: identifier },
                    { '$contact.email$': identifier },
                    { '$contact.phoneNumber$': identifier },
                ]
            },
            include: [{
                model: this.#Contact
            }, {
                model: this.#Address
            }],
            attributes: { exclude }
        })).get({ plain: true });
    }

    async addUserAddress(addressDTO) {
        const validate = userAddressValidator();
        const isValid = validate(addressDTO);
        if (!isValid) throw createHttpError.BadRequest(validate.errors);        

        await this.#Address.create(addressDTO);
        return true;
    }
}

module.exports = new UserService();