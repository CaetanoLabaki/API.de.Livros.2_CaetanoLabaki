import { booksDatabase, generateId } from "../database/database";
import { AppError } from "../errors/AppError";
import { TBook } from "../interfaces/books.interfaces";

export class BooksServices{
    getBooks(searchTerm?: string) {
        if (searchTerm) {
            const filteredBooks = booksDatabase.filter(book =>
                book.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return filteredBooks;
        }
        return booksDatabase;
    }

    getOneBook(id: string) {
        const findBook = booksDatabase.find(book => book.id === Number(id));
        if (!findBook) {
            throw new AppError(404, "Book not found."); 
        }
        return findBook;
    }

    createBook(name: string, pages: number, category: string | undefined, createdAt: Date, updatedAt: Date) {
        const existingBook = booksDatabase.find(book => book.name === name);
        if (existingBook) {
            throw new AppError(409, "Book with this name already exists."); 
        }

        const newBook: TBook = { id: generateId(), name, pages, category, createdAt, updatedAt };
        
        booksDatabase.push(newBook);
        return newBook;
    }

    deleteBook(id: string){
        const index = booksDatabase.findIndex(book => book.id === Number(id));

        booksDatabase.splice(index, 1);        
    }
    
    updateBook(id: string, updateData: Partial<TBook>) {
        const index = booksDatabase.findIndex(book => book.id === Number(id));
        if (index === -1) {
            throw new AppError(404, "Book not found."); 
        }
        
        if (updateData.name) {
            const existingBook = booksDatabase.find(book => book.name === updateData.name && book.id !== Number(id));
            if (existingBook) {
                throw new AppError(409, "A book with the same name already exists."); 
            }
        }

        const updatedBook = { ...booksDatabase[index], ...updateData, updatedAt: new Date() };
        booksDatabase[index] = updatedBook;

        return updatedBook;
    }

} 