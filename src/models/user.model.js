const { DataTypes } = require("@sequelize/core");
const sequelize = require("../configs/db.config");
const Contact = require("./contact.model");

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 30],
            isAlphanumeric: true
        }
    },
    hashedPassword: {
        type: DataTypes.STRING(161),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    lastName: {
        type: DataTypes.STRING(30),
        validate: {
            isAlpha: true
        }
    },
    bio: {
        type: DataTypes.TEXT
    },
    profilePhoto: {
        type: DataTypes.TEXT,
        validate: {
            isUrl: true
        }
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.STRING(20),
        validate: {
            isAlphanumeric: true
        }
    }
}, {
    paranoid: true
});

User.hasOne(Contact);
Contact.belongsTo(User);

module.exports = User;