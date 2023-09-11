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
            message:  "Categories fetched successfully",
            data: result
        });
    })

export const CategoryController = {
    create,getAll
}