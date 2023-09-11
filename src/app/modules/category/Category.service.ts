import { Category } from "@prisma/client"
import { prisma } from "../../../shared/prisma"
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const create = (data: Category): Promise<Category> => {
    const result = prisma.category.create({ data });

    return result;
}


const getAll = async () :Promise<Category[]>=> {
    const result = await prisma.category.findMany({});

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not exists");
    }
    return result;
}





export const CategoryService = {
    create, getAll
}