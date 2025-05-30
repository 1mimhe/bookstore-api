const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const headerNames = require("../constants/header.names");
const authMessages = require("../constants/auth.messages");
const { getUserByIdentifier } = require("../services/user.service");

async function authorization(req, res, next) {
    try {
        const accessToken = req.headers[headerNames.Auth]?.split(" ")[1];
        if (!accessToken) throw createHttpError.Unauthorized(authMessages.MissingAccessToken);

        const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
        if (!payload?.username) {
            throw createHttpError.Unauthorized(authMessages.InvalidToken);
        }

        const user = await getUserByIdentifier(payload.username,  ['hashedPassword']);
        if (!user) throw createHttpError.Unauthorized(authMessages.InvalidToken);
        
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
            const hasPermission = req.user.roles?.some(userRole => requiredRoles.includes(userRole));

            if (!hasPermission) {
                throw createHttpError.Forbidden(authMessages.AccessDenied);
            }

            next();
        } catch (error) {
            error.message = `Permission Error: ${error.message}`;
            next(error);
        }
    };
}

module.exports = {
    authorization,
    checkRoles
}