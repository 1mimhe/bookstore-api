const { Router } = require("express");
const { addPublisher } = require("../controllers/publisher.controller");
const publisherRouter = Router();

publisherRouter.post('', addPublisher);

module.exports = publisherRouter;