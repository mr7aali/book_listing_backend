import { PrismaClient, User } from "@prisma/client"
const prisma = new PrismaClient();



const createUser = async (data: User): Promise<User> => {
    const result = await prisma.user.create({ data })


    return result;
};

const getAllUser = async () => {
    const result = await prisma.user.findMany({});

    return result;
}
const getSingleUser = async (id: string): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return result;
}
export const UserService = {
    createUser, getAllUser,
    getSingleUser
}