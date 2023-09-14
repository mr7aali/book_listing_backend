import { prisma } from './../../../shared/prisma';
import { IGenericResponse } from './../../../interfaces/common';
import { Book, Prisma } from "@prisma/client";
import httpStatus from "http-status";

import ApiError from "../../../errors/ApiError";
import { IBookFilterRequest, IPaginationOptions } from "../../../interfaces/pagination";
import { BookSearchAbleFields } from './book.interface';






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


const getAll = async (filters: Partial<IBookFilterRequest>, paginationOption: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {

    const page = Number(paginationOption.page) || 1;
    const limit = Number(paginationOption.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = paginationOption.sortBy || 'publicationDate';
    const sortOrder = paginationOption.sortOrder || 'asc';
    const searchTerm = filters.searchTerm


    const sortCondition: { [key: string]: string } = {};
    const andConditions = [];

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder
    }

    if (searchTerm) {
        andConditions.push({
            OR: BookSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    };

    delete filters.searchTerm;
    console.log(Object.keys(filters));
    if (Object.keys(filters).length > 0) {


        andConditions.push({
            AND: Object.keys(filters).map((key) => ({
                [key]: {
                    equals: (filters as any)[key]
                }
            }))
        })
    };




    const whereCondition: Prisma.BookWhereInput = andConditions.length > 0 ?
        {
            AND: andConditions,
            price:{
                gt:0
            }
        }

        : {};
    const result = await prisma.book.findMany({
        where: whereCondition,
        // where: {
        //     price: {
        //         gt: 500
        //     }
        // },
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