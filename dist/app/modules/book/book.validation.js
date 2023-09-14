"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Tite is required." }),
        author: zod_1.z.string({ required_error: "Author is required." }),
        price: zod_1.z.number({ required_error: "Price is required." }),
        genre: zod_1.z.string({ required_error: "Genre is required." }),
        publicationDate: zod_1.z.string({ required_error: "Publication Date is required." }),
        categoryId: zod_1.z.string({ required_error: "categoryId is required." })
    })
});
exports.BookValidation = {
    createZodSchema
};
