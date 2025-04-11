const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const Contact = sequelize.define("contact", {
    phoneNumber: {
        type: DataTypes.STRING(11),
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
}, {
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            name: "userId_index",
            fields: ["userId"]
        }
    ]
});

module.exports = Contact;