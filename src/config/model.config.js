const User = require("../models/user.model");
const Contact = require("../models/contact.model");

async function modelsConfig() {
    if (process.env.NODE_ENV === "development") {
        await User.sync({ alter: true });
        await Contact.sync({ alter: true });
    }
}

modelsConfig();