const { Router } = require('express');
const allRouters = Router();
const authRouter = require("./auth.router");
const userRouter = require('./user.router');
const languageRouter = require('./language.router');
const bookRouter = require('./book.router');
const profileRouter = require('./profile.router');
const publisherRouter = require('./publisher.router');

allRouters.use("/auth", authRouter);
allRouters.use("/users", userRouter);
allRouters.use("/languages", languageRouter);
allRouters.use("/books", bookRouter);
allRouters.use("/profiles", profileRouter);
allRouters.use("/publishers", publisherRouter);

module.exports = allRouters;