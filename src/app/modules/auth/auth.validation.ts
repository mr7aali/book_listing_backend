import { object, z } from "zod";

const authZodSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required." }),
        password: z.string({ required_error: "Password is required." })
    })
});
const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: "refreshToken is required." })
    })
})



export const AuthValidaton = {
    authZodSchema, refreshTokenZodSchema
}