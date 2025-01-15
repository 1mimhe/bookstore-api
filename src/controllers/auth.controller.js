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

    async loginUser(req, res, next) {
        try {
            const { identifier, password } = req.body;
            const a = await this.#Service.loginUser({ identifier, password });
            console.log(a.accessToken, a.refreshToken );
            
            return res.status(201)
            .set("Authorization", `Bearer ${a.accessToken}`)
            .cookie("Refresh-Token", a.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 20 * 24 * 3600 * 1000
            })
            .json({
                success: true,
                message: authMessages.UserLoginSuccessfully
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();