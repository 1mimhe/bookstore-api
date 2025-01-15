const { createClient } = require("redis");

async function redisConfig() {
    const redisClient = createClient({
        socket: {
            host: process.env.HOSTNAME,
            port: process.env.REDIS_PORT
        }
    });
    redisClient.on("error", err => console.log("Redis Client Error: ", err.message));
    redisClient.on("connect", () => console.log("Redis Connected."));
    await redisClient.connect();

    return redisClient;
}

module.exports = redisConfig();