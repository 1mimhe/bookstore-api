const { DataTypes } = require('@sequelize/core');
const sequelize = require('../../config/sequelize.config');

const bookImageTypes = [
  'main',
  'back',
  'inside',
  'cover'
];

const BookImage = sequelize.define("book_image", {
  type: {
    type: DataTypes.ENUM(...bookImageTypes),
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      name: 'bookId_index',
      fields: ['bookId']
    }
  ]
});

module.exports = BookImage;