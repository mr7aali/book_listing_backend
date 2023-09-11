import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

// const createUser = 


const createUser = catchAsync(
    async (req: Request, res: Response) => {
        const result = await UserService.createUser(req.body);


        sendResponse<User>(res, {
            success: true,
            statusCode: 200,
            message: "User created successfully!",
            data: result
        })
    });


const getAllUser = catchAsync(
    async (req: Request, res: Response) => {
        const result = await UserService.getAllUser();

        sendResponse<User[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Users retrieved successfully",
            data: result
        });
    })
const getSingleUser = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await UserService.getSingleUser(id);
        sendResponse<User>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User getched successfully",
            data: result
        })
    }
)

const updateSingleUser = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;
        const data = req.body
     

        const result = await UserService.updateSingleUser(id, data);
       
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Update User successfully",
            data: result
        })
    }
)
const deleteSingleUser = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;


        const result = await UserService.deleteSingleUser(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Uers deleted successfully",
            data: result
        })
    }
)


export const UserController = {
    createUser, getAllUser,
    getSingleUser, deleteSingleUser,
    updateSingleUser
}