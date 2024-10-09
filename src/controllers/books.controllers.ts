import { Request, Response } from "express";
import { BooksServices } from "../services/books.services";

export class BooksControllers{
    
    getBooks(req: Request, res: Response): Response {
        const booksServices = new BooksServices();    
        const searchTerm = req.query.search as string | undefined;

        const response = booksServices.getBooks(searchTerm); 
        return res.status(200).json(response);
    }
    

    createBook(req: Request, res: Response): Response{
        const booksServices = new BooksServices();

        const response = booksServices.createBook(req.body.name, req.body.pages, req.body.category, req.body.createdAt, req.body.updatedAt);

        return res.status(201).json(response);
    }

    deleteBook(req: Request, res: Response): Response{
        const booksServices = new BooksServices();

        const response = booksServices.deleteBook(req.params.id);

        return res.status(204).json(response);
    }

    getOneBook(req: Request, res: Response): Response{
        const booksServices = new BooksServices();

        const response = booksServices.getOneBook(req.params.id);

        return res.status(200).json(response);
    }

    updateBook(req: Request, res: Response): Response {
        const booksServices = new BooksServices();

        const id = req.params.id;
        const updateData = req.body;

        const response = booksServices.updateBook(id, updateData);

        return res.status(200).json(response);
    }

}

