const { Router } = require("express");
const { registrationUser, loginUser } = require("../controllers/auth.controller");
const authRouter = Router();

authRouter.post("/registration", registrationUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;