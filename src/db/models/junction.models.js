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

const TitleTag = sequelize.define('title_tag', {},
{
  timestamps: true,
  indexes: [
    {
      name: 'titleId_index',
      fields: ['titleId']
    },
    {
      name: 'tagId_index',
      fields: ['tagId']
    },
    {
      name: 'titleId_tagId_index',
      fields: ['titleId', 'tagId'],
      unique: true
    }
  ]
});

const ArticleTag = sequelize.define('article_tag', {},
{
  timestamps: true,
  indexes: [
    {
      name: 'articleId_index',
      fields: ['articleId']
    },
    {
      name: 'tagId_index',
      fields: ['tagId']
    },
    {
      name: 'articleId_tagId_index',
      fields: ['articleId', 'tagId'],
      unique: true
    }
  ]
});

module.exports = {
  BookTranslator,
  TitleTag,
  ArticleTag,
  TitleAuthor
};