const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const Title = sequelize.define("title", {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  summary: DataTypes.TEXT,
  originallyPublishedAt: DataTypes.DATEONLY,
  originalLanguage: DataTypes.STRING
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