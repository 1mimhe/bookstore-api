const { Router } = require("express");
const { registrationUser, loginUser, refreshTokens, logoutUser } = require("../controllers/auth.controller");
const authRouter = Router();

authRouter.post("/registration", registrationUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh-token", refreshTokens);
authRouter.post("/logout", logoutUser);

module.exports = authRouter;