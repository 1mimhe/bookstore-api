const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const headerNames = require("../constants/header.names");
const authMessages = require("../constants/auth.messages");
const User = require("../models/user.model");

async function authorization(req, res, next) {
    try {
        const accessToken = req.headers[headerNames.Auth]?.split(" ")[1];
        if (!accessToken) throw createHttpError.Unauthorized(authMessages.MissingAccessToken);
        console.log(process.env.JWT_ACCESS_SECRET_KEY);
        
        const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
        if (!payload?.username) {
            throw createHttpError.Unauthorized(authMessages.InvalidAccessToken);
        }

        const user = await User.findOne({
            where: {
                username: payload.username
            },
            attributes: {
                exclude: ['hashedPassword']
            },
            raw: true
        });
        if (!user) throw createHttpError.Unauthorized(authMessages.InvalidAccessToken);
        req.user = user;

        next();
    } catch (error) {
        error.message = `Authorization Error: ${error.message}`;
        next(error);
    }
}

module.exports = {
    authorization
}