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
      const { name, slug, summary, originallyPublishedAt } = req.body;
      const newTitle = await this.#Service.addTitle({ name, slug, summary, originallyPublishedAt });
      return res.status(201).json(newTitle);
    } catch (error) {
      next(error);
    }
  }

  async getTitleById(req, res, next) {
    try {
      const { id } = req.params;
      
      const title = await this.#Service.getTitleById(id);
      return res.json(title);
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
      const { name, slug, summary, originallyPublishedAt } = req.body;
      const editedTitle = await this.#Service.editTitle(id, { name, slug, summary, originallyPublishedAt });
      return res.json(editedTitle);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TitleController()