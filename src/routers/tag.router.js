const { Router } = require("express");
const { addTag } = require("../services/tag.service");
const { editTag } = require("../controllers/tag.controller");
const tagRouter = Router();

tagRouter.post('', addTag);
tagRouter.patch('/:id', editTag);

module.exports = tagRouter;