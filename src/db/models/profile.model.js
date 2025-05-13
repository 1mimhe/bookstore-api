const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const { makeUnique } = require("../../utils/sanitization.utils");

const Profile = sequelize.define("profile", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  biography: {
    type: DataTypes.TEXT
  },
  dateOfBirth: DataTypes.DATE,
  dateOfDeath: DataTypes.DATE
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: (profile, options) => {
      profile.slug = makeUnique(profile.slug);
    }
  }
});

module.exports = Profile;