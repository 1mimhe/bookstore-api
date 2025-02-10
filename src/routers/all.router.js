const { Router } = require('express');
const allRouters = Router();
const authRouter = require("./auth.router");
const userRouter = require('./user.router');

allRouters.use("/auth", authRouter);
allRouters.use("/user", userRouter);

module.exports = allRouters;