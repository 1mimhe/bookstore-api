const autoBind = require("auto-bind");
const userService = require("../services/user.service");

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
}

module.exports = new UserController();