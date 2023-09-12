import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import { ILoginResponse, IRefreshTokenResponse } from "./auth.interface";

const login = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.body;
        const result = await AuthService.login(user);


        //set refresh token into cookie
        const cookieOption = {
            secure: true,  // production ? true : false
            httpOnly: true
        };
        res.cookie("refreshToken", result.refreshToken, cookieOption);

        delete result.refreshToken;

        sendResponse<IRefreshTokenResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User login successfully!",
            data: result
        })
    }
);

const refreshToken = catchAsync(
    async (req: Request, res: Response) => {

        const refreshToken = req.cookies.refreshToken;

        const result = await AuthService.refreshToken(refreshToken);

        //set refresh token into cookie
        const cookieOption = {
            secure: true,  // production ? true : false
            httpOnly: true
        };
    
        res.cookie("refreshToken", refreshToken, cookieOption);

       

        sendResponse<IRefreshTokenResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User login successfully!",
            data: result
        })
    }
)

export const AuthController = {
    login,refreshToken
}