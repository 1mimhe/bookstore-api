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

      const newPublisher = await this.#Service.addPublisher({ name, slug, description } );
      return res.status(201).json(newPublisher);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();