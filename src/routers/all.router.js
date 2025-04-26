const { Router } = require('express');
const allRouters = Router();
const authRouter = require("./auth.router");
const userRouter = require('./user.router');
const languageRouter = require('./language.router');
const bookRouter = require('./book.router');

allRouters.use("/auth", authRouter);
allRouters.use("/users", userRouter);
allRouters.use("/languages", languageRouter);
allRouters.use("/books", bookRouter);

module.exports = allRouters;