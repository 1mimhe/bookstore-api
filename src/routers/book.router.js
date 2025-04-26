const { Router } = require("express");
const { addTitle, getTitleById, getTitles, editTitle, addBook } = require("../controllers/book.controller");
const bookRouter = Router();

bookRouter.post('/titles', addTitle);
bookRouter.get('/titles/paginated/:limit/:offset', getTitles);
bookRouter.get('/titles/:id', getTitleById);
bookRouter.patch('/titles/:id', editTitle);
bookRouter.post('/', addBook);

module.exports = bookRouter;