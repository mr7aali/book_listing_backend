import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";

const login = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.body;

        const result = await AuthService.login(user);



        sendResponse<User>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User login",
            data: result
        })
    }
)

export const AuthController = {
    login
}