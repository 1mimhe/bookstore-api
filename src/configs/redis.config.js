const { createClient } = require("redis");

let isConnectionSuccess = true;

function redisConfig() {
    const redisClient = createClient({
        socket: {
            host: process.env.HOSTNAME,
            port: +process.env.REDIS_PORT
        }
    });

    redisClient.on("error", err => {
        if (!isConnectionSuccess) return;
        isConnectionSuccess = false;
        console.log("Redis Client Error: ", err.message);
    });
    redisClient.on("connect", () => console.log("Redis Connected."));

    redisClient.connect();
    return redisClient;
}

module.exports = redisConfig();