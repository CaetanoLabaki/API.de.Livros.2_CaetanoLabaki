import { Router } from "express";
import { BooksControllers } from "../controllers/books.controllers";
import { IsBookIdValid } from "../middlewares/isBookIdValid.middleware";
import { ValidateRequest } from "../middlewares/validateRequest.middleware";
import { createBookBodySchema, updateBookSchema } from "../schemas/bookSchema";

export const booksRouter = Router();

const booksControllers = new BooksControllers();

booksRouter.get("/", booksControllers.getBooks);

booksRouter.get("/:id", IsBookIdValid.execute, booksControllers.getOneBook)

booksRouter.post("/", ValidateRequest.execute({body: createBookBodySchema}), booksControllers.createBook);

booksRouter.delete("/:id", IsBookIdValid.execute, booksControllers.deleteBook);

booksRouter.patch("/:id", IsBookIdValid.execute, booksControllers.updateBook, ValidateRequest.execute({ body: updateBookSchema}));
