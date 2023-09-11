
import { Book } from "@prisma/client";
import httpStatus from "http-status";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";


const create = async (data: Book): Promise<Book> => {

    const result = await prisma.book.create({ data });
    return result;
}


const getAll = async (): Promise<Book[]> => {
    const result = await prisma.book.findMany({});

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Book not exists");
    }
    return result;
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