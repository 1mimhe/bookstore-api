const createHttpError = require("http-errors");
const { addTitleValidator, editTitleValidator, addBookValidator, editBookValidator } = require("../validators/book.validators");
const autoBind = require("auto-bind");
const { Title, Book } = require("../db/models/associations");
const bookMessages = require("../constants/book.messages");

class BookService {
  #Title;
  #Book;

  constructor() {
    autoBind(this);

    this.#Title = Title;
    this.#Book = Book;
  }

  async addTitle(titleDTO) {
    const validate = addTitleValidator();
    const isValid = validate(titleDTO);
    if (!isValid) throw createHttpError.BadRequest(validate.errors);
    // TODO: elasticsearch
    return this.#Title.create(titleDTO);
  }

  async getTitleById(id) {
    const title = await this.#Title.findByPk(id);
    if (!title) throw new createHttpError.NotFound(bookMessages.TitleNotFound);
    return title;
  }

  async getPaginatedTitles(limit = 10, offset = 0) {
    return this.#Title.findAll({
      limit,
      offset
    });
  }

  async editTitle(titleId, titleDTO) {
    const validate = editTitleValidator();    
    const isValid = validate(titleDTO);
    if (!isValid) throw createHttpError.BadRequest(validate.errors);

    const title = await this.getTitleById(titleId);
    Object.keys(titleDTO).forEach(key => title[key] = titleDTO[key]);
    return title.save();
  }

  async addBook(bookDTO) {
    const validate = addBookValidator();
    const isValid = validate(bookDTO);    
    if (!isValid) throw createHttpError.BadRequest(validate.errors);
    // TODO: elasticsearch
    return this.#Book.create(bookDTO);
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
      include: [{
        model: this.#Book
      }] // TODO: other relations
    });
  }

  async getCompleteTitleBySlug(slug) {
    return this.#Title.findOne({
      where: {
        slug
      },
      include: [{
        model: this.#Book
      }] // TODO: other relations
    });
  }
}

module.exports = new BookService();