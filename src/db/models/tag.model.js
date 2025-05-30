const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const { toSlug } = require("../../utils/sanitization.utils");


const Tag = sequelize.define("tag", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeSave: (tag, options) => {
      if (!tag.slug) tag.slug = tag.name;
      tag.slug = toSlug(title.slug);
    }
  }
});

module.exports = Tag;