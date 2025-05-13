const sequelize = require("../../config/sequelize.config");

const BookTranslator = sequelize.define('book_translator', {},
{
  timestamps: true,
  indexes: [
    {
      name: 'translatorId_index',
      fields: ['translatorId']
    },
    {
      name: 'bookId_index',
      fields: ['bookId']
    }
  ]
});

module.exports = BookTranslator;