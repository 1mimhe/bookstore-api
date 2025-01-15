const { createClient } = require("redis");

const redisClient = createClient({
    socket: {
        host: process.env.HOSTNAME,
        port: process.env.REDIS_PORT
    }
});
redisClient.on("error", err => console.log("Redis Client Error: ", err.message));
redisClient.on("connect", () => console.log("Redis Connected."));
redisClient.connect();

module.exports = redisClient;