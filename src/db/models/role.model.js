const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const roles = [
  'customer', 'admin', 'content-manager',
  'inventory-manager', 'order-manager', 'publisher'
];

const Role = sequelize.define("role", {
  name: {
    type: DataTypes.ENUM(...roles),
    allowNull: false
  }
}, {
  timestamps: true,
  paranoid: true
});

module.exports = Role;