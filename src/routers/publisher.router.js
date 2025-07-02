const { Router } = require("express");
const { addPublisher, deletePublisher, editPublisher, getPublisherById } = require("../controllers/publisher.controller");
const publisherRouter = Router();

publisherRouter.post('', addPublisher);
publisherRouter.get('/:id', getPublisherById);
publisherRouter.patch('/:id', editPublisher);
publisherRouter.delete('/:id', deletePublisher);

module.exports = publisherRouter;