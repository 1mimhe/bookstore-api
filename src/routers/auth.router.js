const { Router } = require("express");
const { registrationUser } = require("../controllers/auth.controller");
const authRouter = Router();

authRouter.post("/registration", registrationUser);

module.exports = authRouter;