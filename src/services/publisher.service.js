const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const Publisher = require("../db/models/publisher.model");
const { addPublisherValidator } = require("../validators/publisher.validator");

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
}

module.exports = new PublisherService();