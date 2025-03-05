const User = require("./user.model");
const Role = require("./role.model");
const Contact = require("./contact.model");
const Address = require("./address.model");

// User-Contact
User.hasOne(Contact, {
  foreignKey: 'userId',
  as: 'contact'
});
Contact.belongsTo(User, {
  foreignKey: 'userId'
});

// User-Role
User.hasMany(Role, {
  foreignKey: 'userId',
  as: 'roles'
});
Role.belongsTo(User, {
  foreignKey: "userId"
});

// User-Address
User.hasMany(Address, {
  foreignKey: 'userId',
  as: 'addresses'
});
Address.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = {
  User,
  Contact,
  Role
};