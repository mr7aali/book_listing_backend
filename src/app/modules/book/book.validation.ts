import { z } from "zod";

const createZodSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Tite is required." }),
        author: z.string({ required_error: "Author is required." }),
        price: z.number({ required_error: "Price is required." }),
        genre: z.string({ required_error: "Genre is required." }),
        publicationDate: z.string({ required_error: "Publication Date is required." }),
        categoryId: z.string({ required_error: "categoryId is required." })
    })
})

export const BookValidation = {
    createZodSchema
}