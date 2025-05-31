const tagService = require("../services/tag.service");

class TagController {
  #Service;

  constructor() {
    autoBind(this);

    this.#Service = tagService;
  }

  async addTag(req, res, next) {
    try {
      const { name, slug, description } = req.body;

      const tag = await this.#Service.addTag({ name, slug, description });
      return res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  }

  async editTag(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug, description } = req.body;

      const tag = await this.#Service.editTag(id, { name, slug, description });
      return res.json(tag);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TagController();