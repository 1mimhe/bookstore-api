const { DataTypes } = require("@sequelize/core");
const sequelize = require("../configs/db.config");

const Contact = sequelize.define("contact", {
    phoneNumber: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
            isMobilePhone: true
        }
    },
    isVerifiedPhoneNumber: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
            isEmail: true
        }
    },
    isVerifiedEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Contact;