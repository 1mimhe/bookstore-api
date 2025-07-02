const createHttpError = require("http-errors");
const { addTitleValidator, editTitleValidator, addBookValidator, editBookValidator } = require("../validators/book.validators");
const autoBind = require("auto-bind");
const { Title, Book, BookImage, Tag, Profile, Publisher, Language } = require("../db/models/associations");
const bookMessages = require("../constants/book.messages");
const sequelize = require("../config/sequelize.config");

class BookService {
  #Title;
  #Book;
  #BookImage;
  #Tag;
  #Profile;
  #Publisher;
  #Language;

  constructor() {
    autoBind(this);

    this.#Title = Title;
    this.#Book = Book;
    this.#BookImage = BookImage;
    this.#Tag = Tag;
    this.#Profile = Profile;
    this.#Publisher = Publisher;
    this.#Language = Language;
  }

  async addTitle(titleDTO) {
    console.log(titleDTO);
    const validate = addTitleValidator();
    const isValid = validate(titleDTO);    
    if (!isValid) throw createHttpError.BadRequest(validate.errors);
    // TODO: elasticsearch
    return sequelize.transaction(async t => {
      const newTitle = await this.#Title.create(titleDTO, {
        transaction: t
      });

      if (titleDTO.authorIds?.length > 0) {
        await newTitle.addAuthors(titleDTO.authorIds, {
          transaction: t
        });
      }

      if (titleDTO.tags?.length > 0) {
      const tagIds = await Promise.all(
        titleDTO.tags.map(name =>
          this.#Tag.findOrCreate({
            where: {
              name
            },
            defaults: {
              name,
              slug: name
            },
            transaction: t
          }).then(([tag]) => tag.id)
        )
      );
      console.log(tagIds);
      
      await newTitle.addTags(tagIds, {
        transaction: t
      });
    }
      
      return newTitle;
    });
  }

  async getTitleById(id) {
    const title = await this.#Title.findByPk(id);
    if (!title) throw new createHttpError.NotFound(bookMessages.TitleNotFound);
    return title;
  }

  async getPaginatedTitles(limit = 10, offset = 0) {
    return this.#Title.findAll({
      limit: Number(limit),
      offset: Number(offset)
    });
  }

  async editTitle(titleId, titleDTO) {
    const validate = editTitleValidator();
    const isValid = validate(titleDTO);
    if (!isValid) throw createHttpError.BadRequest(validate.errors);

    return sequelize.transaction(async t => {
      const title = await this.getTitleById(titleId);

      Object.keys(titleDTO).forEach(key => {
        if (key !== 'tags') title[key] = titleDTO[key];
      });
      await title.save({ transaction: t });

      if (titleDTO.tags?.length > 0) {
        const tagIds = await Promise.all(
          titleDTO.tags.map(name =>
            this.#Tag.findOrCreate({
              where: { name },
              defaults: {
                name,
                slug: name
              },
              transaction: t
            }).then(([tag]) => tag.id)
          )
        );

        await title.setTags(tagIds, {
          transaction: t
        });
      }

      return title;
    });
  }

  async addBook(bookDTO) {
    const validate = addBookValidator();
    const isValid = validate(bookDTO);    
    if (!isValid) throw createHttpError.BadRequest(validate.errors);
    // TODO: elasticsearch

    const { bookImages, ...book } = bookDTO;
    return sequelize.transaction(async t => {
      const newBook = await this.#Book.create(book, {
        transaction: t
      });

      if (bookDTO.translatorIds?.length > 0) {
        await newBook.addTranslators(bookDTO.translatorIds, {
          transaction: t
        });
      }

      if (bookImages) {
        const imagesToCreate = bookImages.map(image => ({
          ...image,
          bookId: newBook.id
        }));
        
        const newBookImages = await this.#BookImage.bulkCreate(imagesToCreate, { transaction: t });
        newBook.bookImages = newBookImages;
      }

      return newBook;
    });
  }

  async getBookById(id) {
    const title = await this.#Book.findByPk(id);
    if (!title) throw new createHttpError.NotFound(bookMessages.BookNotFound);
    return title;
  }

  async editBook(bookId, bookDTO) {
    const validate = editBookValidator();
    const isValid = validate(bookDTO);    
    if (!isValid) throw createHttpError.BadRequest(validate.errors);

    const book = await this.getBookById(bookId);
    Object.keys(bookDTO).forEach(key => book[key] = bookDTO[key]);
    return book.save();
  }

  async getCompleteTitleById(id) {
    return this.#Title.findByPk(id, {
      include: [
        {
          model: this.#Tag,
          as: 'tags',
          through: { attributes: [] }
        },
        {
          model: this.#Profile,
          as: 'authors',
          through: { attributes: [] }
        },
        {
          model: this.#Book,
          as: 'books',
          include: [
            {
              model: this.#Profile,
              as: 'translators',
              through: { attributes: [] }
            },
            {
              model: this.#Publisher,
              as: 'publisher'
            },
            {
              model: this.#BookImage,
              as: 'bookImages'
            },
            {
              model: this.#Language,
              as: 'language'
            }
          ]
        }
      ]
    }); // TODO: other relations
  }

  async getCompleteTitleBySlug(slug) {
    return this.#Title.findOne({
      where: {
        slug
      },
      include: [
        {
          model: this.#Tag,
          as: 'tags',
          through: { attributes: [] }
        },
        {
          model: this.#Profile,
          as: 'authors',
          through: { attributes: [] }
        },
        {
          model: this.#Book,
          as: 'books',
          include: [
            {
              model: this.#Profile,
              as: 'translators',
              through: { attributes: [] }
            },
            {
              model: this.#Publisher,
              as: 'publisher'
            },
            {
              model: this.#BookImage,
              as: 'bookImages'
            },
            {
              model: this.#Language,
              as: 'language'
            }
          ]
        }
      ]
    }); // TODO: other relations
  }
  
  async deleteBook(id) {
    return this.#Book.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new BookService();