import { z } from "zod";
import { bookSchema, createBookBodySchema, updateBookSchema } from "../schemas/bookSchema";

export type TBook = z.infer<typeof bookSchema>;

export type TCreateBookBody = z.infer<typeof createBookBodySchema>;

export type TEditBookBody = z.infer<typeof updateBookSchema>;