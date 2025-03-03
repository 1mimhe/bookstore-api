const { Sequelize } = require("@sequelize/core");

class SequelizeConfig {
    static #instance = null;

    static getInstance() {
        if (this.#instance) return this.#instance;

        const sequelize = new Sequelize({
            dialect: "mysql",
            host: process.env.HOSTNAME,
            port: +process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: false
        });
        
        sequelize.authenticate().then(async () => {
            console.log("Connected to DB.");
        }).catch((err) => console.log("DB Error:", err));

        this.#instance = sequelize;
        return this.#instance;
    }
}

module.exports = SequelizeConfig.getInstance();