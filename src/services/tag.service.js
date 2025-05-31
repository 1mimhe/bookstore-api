const createHttpError = require("http-errors");
const { Tag } = require("../db/models/associations");
const { addTagValidator, editTagValidator } = require("../validators/tag.validator");
const otherMessages = require("../constants/other.messages");

class TagService {
  #Tag;

  constructor() {
    autoBind(this);

    this.#Tag = Tag;
  }

  async addTag(tagDTO) {
    const validate = addTagValidator();
    const isValid = validate(tagDTO);
    if (!isValid) throw createHttpError.BadRequest(validate.errors);

    return this.#Tag.create(tagDTO);
  }

  async getTagById(id) {
    const tag = await this.#Tag.findByPk(id);
    if (!tag) throw new createHttpError.NotFound(otherMessages.Tag);
    return tag;
  }

  async editTag(id, tagDTO) {
    const validate = editTagValidator();
    const isValid = validate(tagDTO);
    if (!isValid) throw createHttpError.BadRequest(validate.errors);
    
    const tag = await this.getTagById(id);
    Object.keys(tagDTO).forEach(key => tag[key] = tagDTO[key]);
    return tag.save();
  }
}

module.exports = new TagService();