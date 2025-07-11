const autoBind = require("auto-bind");
const BookService = require("../services/book.service");

class TitleController {
  #Service;

  constructor() {
    autoBind(this);

    this.#Service = BookService;
  }

  async addTitle(req, res, next) {
    try {
      let { name, slug, authorIds, summary, originallyPublishedAt, tags } = req.body;
      if (!slug) slug = name;

      const newTitle = await this.#Service.addTitle({ name, slug, authorIds, summary, originallyPublishedAt, tags });
      return res.status(201).json(newTitle);
    } catch (error) {
      next(error);
    }
  }

  async getTitles(req, res, next) {
    try {
      const { limit, offset } = req.params;
      const titles = this.#Service.getPaginatedTitles(limit, offset);
      return res.json(titles);
    } catch (error) {
      next(error);
    }
  }

  async editTitle(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug, summary, originallyPublishedAt, tags } = req.body;
      const editedTitle = await this.#Service.editTitle(id, { name, slug, summary, originallyPublishedAt, tags });
      return res.json(editedTitle);
    } catch (error) {
      next(error);
    }
  }

  async addBook(req, res, next) {
    try {
      const { name, anotherName, titleId,
        translatorIds, publisherId, languageId, ISBN, quarto, cover,
        pagesNumber, publishedAt, publishSeries, weight, stock, price, bookImages } = req.body;
        
      const newBook = await this.#Service.addBook({ name, anotherName, titleId, translatorIds, publisherId, languageId, ISBN, quarto, cover,
                                                pagesNumber, publishedAt, publishSeries, weight, stock, price, bookImages });
      return res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  }

  async editBook(req, res, next) {
    try {
      const { id } = req.params;
      const { name, anotherName, languageId, ISBN, quarto, cover,
        pagesNumber, publishedAt, publishSeries, weight, stock, price } = req.body;
        
      await this.#Service.editBook(id, { name, anotherName, languageId, ISBN, quarto, cover,
                                            pagesNumber, publishedAt, publishSeries, weight, stock, price });
      return res.status(200).json({
        success: true
      });
    } catch (error) {
      next(error);
    }
  }

  async getTitleById(req, res, next) {
    try {
      const { id } = req.params;
      const title = await this.#Service.getCompleteTitleById(id);
      return res.json(title);
    } catch (error) {
      next(error);
    }
  }

  async getTitleBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const title = await this.#Service.getCompleteTitleBySlug(slug);
      return res.json(title);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { id } = req.params;        
      const isBookDeleted = await this.#Service.deleteBook(id) ? true : false;
      return res.status(200).json({
        success: isBookDeleted
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TitleController()