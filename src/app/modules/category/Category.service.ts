import { Category } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Sign } from "crypto";

const create = (data: Category): Promise<Category> => {
    const result = prisma.category.create({ data });

    return result;
}


const getAll = async (): Promise<Category[]> => {
    const result = await prisma.category.findMany({});

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Catagory not exists");
    }
    return result;
}

const getSingle = async (id: string): Promise<Category> => {
    const result = await prisma.category.findUnique({
        where: {
            id
        }
    });

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Catagory not exists");
    }
    return result;
}

const update = async (id: string, data: Partial<Category>): Promise<Category> => {
    const result = await prisma.category.update({
        where: {
            id
        },
        data
    })
    return result;
}
const DeleteCatagory = async (id: string): Promise<Category> => {
    const result = await prisma.category.delete({
        where: {
            id
        }
    })
    return result;
}



export const CategoryService = {
    create, getAll, DeleteCatagory,
    getSingle, update
}