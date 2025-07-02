const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const Publisher = require("../db/models/publisher.model");
const { addPublisherValidator, editPublisherValidator } = require("../validators/publisher.validator");
const otherMessages = require("../constants/other.messages");

class PublisherService {
  #Publisher;

  constructor() {
    autoBind(this);

    this.#Publisher = Publisher;
  }

  async addPublisher(publisherDTO) {
    const validate = addPublisherValidator();
    const isValid = validate(publisherDTO);
    if (!isValid) throw createHttpError.BadRequest(validate.errors);

    return this.#Publisher.create(publisherDTO);
  }

  async getPublisherById(id) {
    const profile = await this.#Publisher.findByPk(id);
    if (!profile) throw new createHttpError.NotFound(otherMessages.PublisherNotFound);
    return profile;
  }

  async editPublisher(id, publisherDTO) {
    const validate = editPublisherValidator();
    const isValid = validate(publisherDTO);
    if (!isValid) throw createHttpError.BadRequest(validate.errors);
    
    const publisher = await this.getPublisherById(id);
    Object.keys(publisherDTO).forEach(key => publisher[key] = publisherDTO[key]);
    await publisher.save();
  }

  async deletePublisher(id) {
    return this.#Publisher.destroy({
      where: {
        id
      }
    });
  }
}

module.exports = new PublisherService();