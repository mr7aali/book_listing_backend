import { Book } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { BookService } from "./book.service";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { IBookFilterRequest } from "../../../interfaces/pagination";




const create = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;

        const result = await BookService.create(data);

        sendResponse<Book>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Book created successfully",
            data: result
        })
    }
);
const getAll = catchAsync(
    async (req: Request, res: Response) => {

        const filters  = pick(req.query, ['searchTerm', 'title', 'author', 'genre','maxPrice','minPrice'])
        const paginationOption = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);//paginationFields

     console.log(filters);
        
        const result = await BookService.getAll(filters , paginationOption);

        sendResponse<Book[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Categories fetched successfully",
            meta: result.meta,
            data: result.data
        });
    })
const getSingle = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;


        const result = await BookService.getSingle(id);

        sendResponse<Book>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Categories fetched successfully",
            data: result,
        });
    })


const update = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;

        const result = await BookService.update(id, data);

        sendResponse<Book>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Book updated successfully",

            data: result
        })
    }
)

const DeleteBook = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await BookService.DeleteBook(id);

        sendResponse<Book>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Book deleted successfully",
            data: result
        })
    }
)



export const BookController = {
    create, getAll, getSingle, update,
    DeleteBook
}