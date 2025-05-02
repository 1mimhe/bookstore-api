const sequelize = require("./sequelize.config");

async function dbSync() {
    if (process.env.NODE_ENV === "development") {
        await sequelize.sync({ alter: true });
    }
}

dbSync();