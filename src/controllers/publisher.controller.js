const autoBind = require("auto-bind");
const publisherService = require("../services/publisher.service");

class ProfileController {
  #Service;

  constructor() {
    autoBind(this);

    this.#Service = publisherService;
  }

  async addPublisher(req, res, next) {
    try {
      let { name, slug, description } = req.body;
      if (!slug) slug = name;

      const newPublisher = await this.#Service.addPublisher({ name, slug, description });
      return res.status(201).json(newPublisher);
    } catch (error) {
      next(error);
    }
  }

  async getPublisherById(req, res, next) {
    try {
      const { id } = req.params;
      const publisher = await this.#Service.getPublisherById(id);
      return res.json(publisher);
    } catch (error) {
      next(error);
    }
  }

  async editPublisher(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug, description } = req.body;

      await this.#Service.editPublisher(id, { name, slug, description });
      return res.status(200).json({
        success: true
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePublisher(req, res, next) {
    try {
      const { id } = req.params;
      const isProfileDeleted = await this.#Service.deletePublisher(id) ? true : false;
      return res.status(200).json({
        success: isProfileDeleted
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();