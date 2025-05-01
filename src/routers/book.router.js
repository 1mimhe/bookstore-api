const { Router } = require("express");
const { addTitle, getTitles, editTitle, addBook, getTitleById, getTitleBySlug, editBook } = require("../controllers/book.controller");
const bookRouter = Router();

bookRouter.post('/titles', addTitle);
bookRouter.get('/titles/paginated/:limit/:offset', getTitles);
bookRouter.get('/titles/:slug', getTitleBySlug);
bookRouter.get('/titles/by-id/:id', getTitleById);
bookRouter.patch('/titles/:id', editTitle);
bookRouter.post('/', addBook);
bookRouter.patch('/:id', editBook);

module.exports = bookRouter;