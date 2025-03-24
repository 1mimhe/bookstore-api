const autoBind = require("auto-bind");
const userService = require("../services/user.service");
const userMessages = require("../constants/user.messages");

class UserController {
    #Service;

    constructor() {
        this.#Service = userService;
        autoBind(this);
    }

    getMe(req, res, next) {
        try {
            return res.json({
                success: true,
                result: req.user
            });
        } catch (error) {
            next(error);
        }
    }

    async addUserAddress(req, res, next) {
        try {
            const userId = req.user.id;
            const { recipientName, country, province, city, postalAddress, postalCode, phoneNumber } = req.body;
            await this.#Service.addUserAddress({ userId, recipientName, country, province, city, postalAddress, postalCode, phoneNumber })
        
            return res.status(201).json({
                success: true,
                message: userMessages.AddressAddedSuccessfully
            });
        } catch (error) {
            next(error);
        }
    }

    async editUser(req, res, next) {
        try {
            const userId = req.user.id;
            const { username, password, firstName, lastName, phoneNumber, email } = req.body;
            await this.#Service.editUser(userId, { username, password, firstName, lastName, phoneNumber, email });

            return res.json({
                success: true,
                message: userMessages.AddressAddedSuccessfully
            });
        } catch (error) {
            console.log(error);
            
            next(error);
        }
    }
}

module.exports = new UserController();