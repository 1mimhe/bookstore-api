const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const Language = sequelize.define("language", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Language;