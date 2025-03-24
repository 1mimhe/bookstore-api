const autoBind = require("auto-bind");
const { Op } = require("@sequelize/core");
const User = require("../db/models/user.model");
const Contact = require("../db/models/contact.model");
const Address = require("../db/models/address.model");
const { addUserAddressValidator, editUserValidator } = require("../validators/user.validators");
const createHttpError = require("http-errors");
const Role = require("../db/models/role.model");

class UserService {
    #User;
    #Contact;
    #Address;
    #Role;

    constructor() {
        autoBind(this);

        this.#User = User;
        this.#Contact = Contact;
        this.#Address = Address;
        this.#Role = Role;
    }

    async getUserByIdentifier(identifier, exclude = []) {
        let whereClause = [];
        if (typeof identifier === 'string') {
            whereClause = [
                { username: identifier },
                { '$contact.email$': identifier },
                { '$contact.phoneNumber$': identifier },
            ]
        } else {
            if (identifier?.username) whereClause.push({ username: identifier.username });
            if (identifier?.email) whereClause.push({ '$contact.email$': identifier.email });
            if (identifier?.phoneNumber) whereClause.push({ '$contact.phoneNumber$': identifier.phoneNumber });
        }

        return (await this.#User.findOne({
            subQuery: false,
            where: {
                [Op.or]: whereClause
            },
            include: [{
                model: this.#Contact
            }, {
                model: this.#Address
            }, {
                model: this.#Role
            }],
            attributes: { exclude }
        }))?.get({ plain: true });
    }

    async getUserById(id) {
        return this.#User.findByPk(id, {
            // subQuery: false,
            include: [{
                model: this.#Contact
            }],
        });
    }

    async addUserAddress(addressDTO) {
        const validator = addUserAddressValidator();
        const isValid = validator(addressDTO);
        if (!isValid) throw createHttpError.BadRequest(validator.errors);

        await this.#Address.create(addressDTO);
        return true;
    }

    async editContact(userId, newContact) {
        return this.#Contact.update(newContact, { where: { userId } });
    }

    async editUser(userId, userDTO) {
        const validator = editUserValidator();
        const isValid = validator(userDTO);
        if (!isValid) throw createHttpError.BadRequest(validator.errors);
        
        await this.editContact(userId, { phoneNumber: userDTO?.phoneNumber, email: userDTO?.email })
        
        const user = await this.getUserById(userId);
        Object.keys(userDTO).forEach(key => user[key] = userDTO[key]);
        await user.save();
    }
}

module.exports = new UserService();