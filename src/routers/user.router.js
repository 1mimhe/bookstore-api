const { Router } = require("express");
const { getMe, addUserAddress } = require("../controllers/user.controller");
const { authorization } = require("../middlewares/auth.middleware");
const userRouter = Router();

userRouter.get("/me", authorization, getMe);
userRouter.post("/addAddress", authorization, addUserAddress);

module.exports = userRouter;