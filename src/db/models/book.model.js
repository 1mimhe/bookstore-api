const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const quartos = [
  'vaziri',
  'roqee',
  'jibi',
  'rahli',
  'kheshti',
  'paltoyi',
  'sultani'
];

const covers = [
  'shoomiz',
  'kaqazi',
  'sakht',
  'charmi'
];

const Book = sequelize.define("book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anotherName: DataTypes.STRING,
  language: DataTypes.STRING,
  ISBN: DataTypes.STRING,
  quarto: DataTypes.ENUM(...quartos),
  cover: DataTypes.ENUM(...covers),
  pagesNumber: DataTypes.INTEGER.UNSIGNED,
  publishedAt: DataTypes.DATEONLY,
  publishSeries: DataTypes.INTEGER.UNSIGNED,
  weight: DataTypes.FLOAT.UNSIGNED,
  stock: DataTypes.INTEGER.UNSIGNED,
  price: DataTypes.FLOAT.UNSIGNED,
  discountPercent: DataTypes.FLOAT.UNSIGNED,
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: 'titleId_index',
      fields: ['titleId']
    },
    // {
    //   name: 'publisherId_index',
    //   fields: ['publisherId']
    // },
    // {
    //   name: 'translatorId_index',
    //   fields: ['translatorId']
    // }
  ]
});

module.exports = Book;