const autoBind = require("auto-bind");
const languageService = require("../services/language.service");

class LanguageController {
  #LanguageService;

  constructor() {
    autoBind(this);

    this.#LanguageService = languageService;
  }

  async addLanguage(req, res, next) {
    try {
      const { language } = req.body;
      const newLanguage = await this.#LanguageService.addLanguage(language);
      return res.status(201).json(newLanguage);
    } catch (error) {
      next(error);
    }
  }

  async getAllLanguages(req, res, next) {
    try {
      const allLanguages = await this.#LanguageService.getAllLanguages();
      return res.json(allLanguages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LanguageController();