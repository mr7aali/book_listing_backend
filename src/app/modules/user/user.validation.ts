import { z } from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.enum(["admin", "customer"]),
        contactNo: z.string(),
        address: z.string(),
        profileImg: z.string()
    })
});
const UpdateUserZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        role: z.enum(["admin", "customer"]).optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
        profileImg: z.string().optional()
    })
});

export const UserValidation = {
    createUserZodSchema, UpdateUserZodSchema
}