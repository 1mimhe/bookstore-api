const { RedisStore } = require('connect-redis');
const cookieSession = require('express-session');
const cookieNames = require('../constants/cookie.names');

function sessionConfig(redisClient) {
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: "user-sess:",
    });

    const session = cookieSession({
        name: cookieNames.SessionID,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: redisStore,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 20 * 24 * 3600 * 1000
        }
    });

    return session;
}

module.exports = sessionConfig;