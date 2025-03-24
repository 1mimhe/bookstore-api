const { Router } = require("express");
const { getMe, addUserAddress, editUser } = require("../controllers/user.controller");
const { authorization, checkRoles } = require("../middlewares/auth.middleware");
const userRouter = Router();

userRouter.get("/me", authorization, getMe);
userRouter.post("/addAddress", authorization, addUserAddress);
userRouter.patch("/edit", authorization, editUser);

module.exports = userRouter;