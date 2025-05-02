const { Router } = require("express");
const { addLanguage, getAllLanguages } = require("../controllers/language.controller");
const languageRouter = Router();

languageRouter.post('', addLanguage);
languageRouter.get('', getAllLanguages);

module.exports = languageRouter;