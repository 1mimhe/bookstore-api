const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "tourism-db",
    logging: false
});

sequelize.authenticate().then(async () => {
    console.log("Connected to DB.");
}).catch((err) => console.log("DB Error:", err.message));

module.exports = sequelize;