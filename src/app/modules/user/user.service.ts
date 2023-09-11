import httpStatus from 'http-status';
import { PrismaClient, User } from "@prisma/client"
import ApiError from "../../../errors/ApiError";
const prisma = new PrismaClient();



const createUser = async (data: User): Promise<User> => {



    const result = await prisma.user.create({ data })
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
    }


    return result;


};


const getAllUser = async () => {
    const result = await prisma.user.findMany({});

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not exists");
    }
    return result;
}
const getSingleUser = async (id: string): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }
    return result;
}
const updateSingleUser = async (id: string, data: Partial<User>) => {

    const result = await prisma.user.update({
        where: {
            id: id
        },
        data
    })
    return result
}
const deleteSingleUser = async (id: string) => {

    const result = await prisma.user.delete({
        where: {
            id: id
        }
    })
    return result
}


export const UserService = {
    createUser, getAllUser,deleteSingleUser,
    getSingleUser, updateSingleUser
}