const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const headerNames = require("../constants/header.names");
const authMessages = require("../constants/auth.messages");
const User = require("../db/models/user.model");

async function authorization(req, res, next) {
    try {
        const accessToken = req.headers[headerNames.Auth]?.split(" ")[1];
        if (!accessToken) throw createHttpError.Unauthorized(authMessages.MissingAccessToken);

        let payload;
        try {
            payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
        } catch (error) {
            throw createHttpError.Unauthorized(authMessages.InvalidAccessToken);
        }
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

function checkRoles(requiredRoles) {
    return async (req, res, next) => {
        try {
            const hasPermission = req.user.roles.some(userRole => requiredRoles.includes(userRole));

            if (!hasPermission) {
                throw createHttpError.Forbidden(authMessages.AccessDenied);
            }

            next();
        } catch (error) {
            error.message = `Authorization Error: ${error.message}`;
            next(error);
        }
    };
}

module.exports = {
    authorization
}