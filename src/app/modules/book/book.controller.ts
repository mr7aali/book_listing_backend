import { Book } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request , Response} from "express";
import httpStatus from "http-status";
import { BookService } from "./book.service";




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
        const result = await BookService.getAll();

        sendResponse<Book[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Categories fetched successfully",
            data: result
        });
    })
const getSingle = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        console.log(id);
        const result = await BookService.getSingle(id);

        sendResponse<Book>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Categories fetched successfully",
            data: result
        });
    })


const update = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const data = req.body;
        console.log(data);
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