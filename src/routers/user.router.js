const { Router } = require("express");
const { getMe } = require("../controllers/user.controller");
const { authorization } = require("../middlewares/auth.middleware");
const userRouter = Router();

userRouter.get("/me", authorization, getMe);

module.exports = userRouter;