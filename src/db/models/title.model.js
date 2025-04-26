const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const Title = sequelize.define("title", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  summary: DataTypes.TEXT,
  originallyPublishedAt: DataTypes.DATEONLY
}, {
  timestamp: true,
  paranoid: true,
  indexes: [
    {
      name: "slug_index",
      fields: ["slug"]
    }
  ]
});

module.exports = Title;