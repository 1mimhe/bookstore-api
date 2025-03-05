const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const Address = sequelize.define("address", {
  recipientName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 60]
    }
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    default: "Iran"
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postalAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING(10)
  },
  phoneNumber: {
    type: DataTypes.STRING(11),
    allowNull: false
  }
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
      {
          name: "userId_index",
          fields: ["userId"]
      }
  ]
});

module.exports = Address;