const User = require("./user.model");
const Role = require("./role.model");
const Contact = require("./contact.model");
const Address = require("./address.model");
const Title = require("./title.model");
const Book = require("./book.model");
const Language = require("./language.model");
const BookImage = require("./bookImage.model");
const Profile = require("./profile.model");
const BookTranslator = require("./bookTranslator.model");
const TitleAuthor = require("./titleAuthor.model");
const Publisher = require("./publisher.model");

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

// Title-Profile(Author)
Title.belongsToMany(Profile, {
  through: TitleAuthor,
  as: 'authors',
  foreignKey: 'titleId',
  otherKey: 'authorId'
});
Profile.belongsToMany(Title, {
  through: TitleAuthor,
  as: 'titles',
  foreignKey: 'authorId',
  otherKey: 'titleId'
});

// Book-Profile(Translator)
Book.belongsToMany(Profile, {
  through: BookTranslator,
  as: 'translators',
  foreignKey: 'bookId',
  otherKey: 'translatorId'
});
Profile.belongsToMany(Book, {
  through: BookTranslator,
  as: 'books',
  foreignKey: 'translatorId',
  otherKey: 'bookId'
});

// Book-Publisher
Book.hasOne(Publisher, {
  foreignKey: 'publisherId',
  as: 'publisher'
});
Publisher.belongsTo(Book, {
  foreignKey: 'publisherId'
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