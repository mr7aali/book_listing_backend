import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";
import { Category } from "@prisma/client";



const create = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
        const result = await CategoryService.create(data);

        sendResponse<Category>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Category created successfully",
            data: result
        })
    }
);
const getAll = catchAsync(
    async (req: Request, res: Response) => {
        const result = await CategoryService.getAll();

        sendResponse<Category[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Categories fetched successfully",
            data: result
        });
    })
const getSingle = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

      
        const result = await CategoryService.getSingle(id);

        sendResponse<Category>(res, {
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
      
        const result = await CategoryService.update(id, data);

        sendResponse<Category>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Category updated successfully",

            data: result
        })
    }
)

const DeleteCatagory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await CategoryService.DeleteCatagory(id);

        sendResponse<Category>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Category deleted successfully",
            data: result
        })
    }
)



export const CategoryController = {
    create, getAll, getSingle, update,
    DeleteCatagory
}