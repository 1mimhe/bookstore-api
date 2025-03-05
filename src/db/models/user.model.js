const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

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
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false
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
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            name: "username_index",
            fields: ["username"]
        }
    ]
});

module.exports = User;