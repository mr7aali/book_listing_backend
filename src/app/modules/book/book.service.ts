import { IGenericResponse } from './../../../interfaces/common';
import { Book } from "@prisma/client";
import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import { IPaginationOptions } from "../../../interfaces/pagination";






const create = async (data: Book): Promise<Book> => {

    const result = await prisma.book.create({
        data: data,
        include: {
            category: true
        }
    }
    );
    return result;
}


const getAll = async (paginationOption: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {

    const page = Number(paginationOption.page) || 1;
    const limit = Number(paginationOption.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = paginationOption.sortBy || 'publicationDate';
    const sortOrder = paginationOption.sortOrder || 'asc';


    const sortCondition: { [key: string]: string } = {};

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder
    }


    const result = await prisma.book.findMany({
        take: limit,
        skip,
        orderBy: sortCondition
        
    });

    // const result = await prisma.book.aggregate({
    //     where: {
           
    //     },
    //     skip,
    //     take: limit, orderBy: sortCondition
    // })

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Book not exists");
    }

    const total = await prisma.book.count();
    const totalPage = Math.ceil(total / limit);

    return {
        meta: {
            page, limit, total, totalPage
        },
        data: result
    };
}

const getSingle = async (id: string): Promise<Book> => {
    const result = await prisma.book.findUnique({
        where: {
            id
        }
    });

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Book not exists");
    }
    return result;
}

const update = async (id: string, data: Partial<Book>): Promise<Book> => {
    const result = await prisma.book.update({
        where: {
            id
        },
        data
    })
    return result;
}
const DeleteBook = async (id: string): Promise<Book> => {
    const result = await prisma.book.delete({
        where: {
            id
        }
    })
    return result;
}


export const BookService = {
    create, getAll, DeleteBook,
    getSingle, update
}