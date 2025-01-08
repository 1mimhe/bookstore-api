const { Router } = require('express');
const allRouters = Router();
const authRouter = require("./auth.router");

allRouters.use("/auth", authRouter);

module.exports = allRouters;