import { z } from "zod";
export const bookSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(2),
    pages: z.number().min(1,),
    category: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const createBookBodySchema = bookSchema.omit({ 
    id: true, 
    createdAt: true, 
    updatedAt: true 
});

export const updateBookSchema = bookSchema.omit({
    id: true, 
    createdAt: true, 
    updatedAt: true 
}).partial();