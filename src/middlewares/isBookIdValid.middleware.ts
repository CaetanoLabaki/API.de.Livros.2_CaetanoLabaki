import { NextFunction, Request, Response } from "express";
import { booksDatabase } from "../database/database";
import { AppError } from "../errors/AppError";

export class IsBookIdValid {
    static execute(req: Request, res: Response, next: NextFunction) {
        if (!booksDatabase.some(book => book.id === Number(req.params.id))) {
            throw new AppError(404, "Book not found.");
        }
        next();
    }

    static isBookNameUnique(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (booksDatabase.some(book => book.name === name)) {
            throw new AppError(409, "Book name already exists.");
        }
        next();
    }
}
