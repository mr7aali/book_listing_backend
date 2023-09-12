import { User } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const login = async (data: Partial<User>): Promise<User> => {
    const isExits = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!isExits) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const result = await prisma.user.findUnique({
        where: {
            email: data.email,
            password: data.password
        }
    })
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Wroung passwoard, Try again!");
    }

    return result;
}


export const AuthService = {
    login
}