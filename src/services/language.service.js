const autoBind = require("auto-bind");
const Language = require("../db/models/language.model");

class LanguageService {
  #Language;

  constructor() {
    autoBind(this);

    this.#Language = Language;
  }

  async addLanguage(language) {
    return this.#Language.create({
      name: language
    });
  }

  async getAllLanguages() {
    return this.#Language.findAll();
  }
}

module.exports = new LanguageService();