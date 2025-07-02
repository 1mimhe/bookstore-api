const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const { makeUnique } = require("../../utils/sanitization.utils");

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
  ],
  hooks: {
    beforeSave: (title, options) => {
      title.slug = makeUnique(title.slug);
    }
  }
});

module.exports = Title;