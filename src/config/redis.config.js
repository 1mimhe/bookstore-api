const { createClient } = require("redis");

class RedisClient {
    static #instance = null;
    static #isConnectionSuccess = true;

    static getInstance() {
        if (this.#instance) return this.#instance;
        
        this.#instance = createClient({
            socket: {
                host: process.env.HOSTNAME,
                port: +process.env.REDIS_PORT
            }
        });
    
        this.#instance.on("error", err => {
            if (!this.#isConnectionSuccess) return;
            this.#isConnectionSuccess = false;
            console.log("Redis Client Error: ", err.message);
        });
        this.#instance.on("connect", () => console.log("Redis Connected."));
    
        this.#instance.connect();
        return this.#instance;
    }
}

module.exports = RedisClient.getInstance();