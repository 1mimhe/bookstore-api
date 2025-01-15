const autoBind = require("auto-bind");
const AuthService = require("../services/auth.service");
const authMessages = require("../constants/auth.messages");

class AuthController {
    #Service;

    constructor() {
        this.#Service = AuthService;
        autoBind(this);
    }

    async registrationUser(req, res, next) {
        try {
            const { username, password, firstName, lastName, phoneNumber, email } = req.body;
            await this.#Service.registrationUser({ username, password, firstName, lastName, phoneNumber, email });

            return res.status(200).json({
                success: true,
                message: authMessages.UserCreated
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();