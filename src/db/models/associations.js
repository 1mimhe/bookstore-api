const User = require("./user.model");
const Role = require("./role.model");
const Contact = require("./contact.model");
const Address = require("./address.model");
const Title = require("./title.model");
const Book = require("./book.model");
const Language = require("./language.model");
const BookImage = require("./bookImage.model");

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
  foreignKey: 'userId'
});

// Title-Book
Title.hasMany(Book, {
  foreignKey: 'titleId',
  as: 'books'
});
Book.belongsTo(Title, {
  foreignKey: 'titleId'
});

// Book-Language
Book.hasOne(Language, {
  foreignKey: 'languageId',
  as: 'language'
});
Language.belongsTo(Book, {
  foreignKey: 'languageId'
});

// Book-BookImage
Book.hasMany(BookImage, {
  foreignKey: 'bookId',
  as: 'bookImages'
});
BookImage.belongsTo(Book, {
  foreignKey: 'bookId'
});

module.exports = {
  User,
  Contact,
  Role,
  Title,
  Book,
  Language,
  BookImage
};