const sequelize = require("../../config/sequelize.config");

const TitleAuthor = sequelize.define('title_author', {},
{
  timestamps: true,
  indexes: [
    {
      name: 'authorId_index',
      fields: ['authorId']
    },
    {
      name: 'titleId_index',
      fields: ['titleId']
    }
  ]
});

module.exports = TitleAuthor;