const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const headerNames = require("../constants/header.names");
const authMessages = require("../constants/auth.messages");
const { getUserByIdentifier } = require("../services/user.service");

async function authorization(req, res, next) {
    try {
        const accessToken = req.headers[headerNames.Auth]?.split(" ")[1];
        if (!accessToken) throw createHttpError.Unauthorized(authMessages.MissingAccessToken);

        let payload;
        try {
            payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
        } catch (error) {
            throw createHttpError.Unauthorized(authMessages.InvalidAccessToken + error.message);
        }
        if (!payload?.username) {
            throw createHttpError.Unauthorized(authMessages.InvalidAccessToken);
        }

        const user = await getUserByIdentifier(payload.username,  ['id', 'hashedPassword']);
        console.log(user);
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