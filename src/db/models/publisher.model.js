const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const { makeUnique } = require("../../utils/sanitization.utils");

const Publisher = sequelize.define("publisher", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: DataTypes.TEXT
}, {
  timestamps: true,
  paranoid: true,
    indexes: [
    {
      name: "slug_index",
      fields: ["slug"]
    }
  ],
  hooks: {
    beforeCreate: (title, options) => {
      title.slug = makeUnique(title.slug);
    }
  }
});

module.exports = Publisher;