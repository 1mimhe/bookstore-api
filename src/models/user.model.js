const { DataTypes } = require("@sequelize/core");
const sequelize = require("../configs/db.config");

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 40],
            isAlphanumeric: true
        }
    },
    hashedPassword: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    last_name: {
        type: DataTypes.STRING(30),
    },
    phoneNumber: {
        type: DataTypes.STRING(11),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    email: {
        type: DataTypes.STRING(40),
        validate: {
            isEmail: true
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
    paranoid: false
});

module.exports = User;