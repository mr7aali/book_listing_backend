import { User } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createToken, verifyToken } from "../../../helpers/jwtHelpers";
import { ILoginResponse, IRefreshTokenResponse, Itoken } from "./auth.interface";



const login = async (data: Partial<User>): Promise<ILoginResponse> => {
    const isExits = await prisma.user.findUnique({
        where: {
            email: data.email
        },
        select: {
            id: true
        }
    });
    if (!isExits) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await prisma.user.findUnique({
        where: {
            email: data.email,
            password: data.password
        },
        select: {
            email: true,
            password: true,
            id: true,
            role: true
        }
    })
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Wroung passwoard, Try again!");
    }


    const Tokendata: Itoken = {
        role: result.role,
        userId: result.id,
    }

    const accessToken = createToken(Tokendata, "access_Token_secret", { expiresIn: '200d' });
    const refreshToken = createToken(Tokendata, "refreshToken_secret", { expiresIn: "365d" });



    return {
        accessToken,
        refreshToken
    };
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    // verify token

    // let verifiedToken: JwtPayload | null = null;


    const verifiedToken = verifyToken(token, "refreshToken_secret")

    if (verifiedToken && 'userId' in verifiedToken) {

        const isUserExist = await prisma.user.findUnique({
            where: {
                id: verifiedToken.userId
            }
        });

        if (!isUserExist) {
            throw new ApiError(httpStatus.NOT_FOUND, "User does not exist")
        }
    }

    // create new AccessToken
    const Tokendata: Itoken = {
        role: verifiedToken.role,
        userId: verifiedToken.userId,
    }

    const newAccessToken = createToken(Tokendata, "access_Token_secret", { expiresIn: '1d' });

 
    return {
        accessToken: newAccessToken
    }

}



export const AuthService = {
    login, refreshToken
}