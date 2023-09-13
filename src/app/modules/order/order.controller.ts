import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";
import { Order } from "@prisma/client";
import httpStatus from "http-status";




const createOrder = catchAsync(
    async (req: Request, res: Response) => {
        const data = req.body;
      
        const result = await OrderService.create(data);


        sendResponse<Order>(res, {
            success: true,
            statusCode: 200,
            message: "Order created successfully!",
            data: result
        })
    });


const getAllOrder = catchAsync(
    async (req: Request, res: Response) => {

        
        const result = await OrderService.getAll();
        sendResponse<Order[]>(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Orders retriever successfully",
            data: result
        });
    })
const getSingleOrder = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await OrderService.getSingle(id);
        sendResponse<Order>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Order getched successfully",
            data: result
        })
    }
)

const updateSingleOrder = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;
        const data = req.body


        const result = await OrderService.updateSingle(id, data);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Update Order successfully",
            data: result
        })
    }
)
const deleteSingleOrder = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;


        const result = await OrderService.deleteSingle(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Uers deleted successfully",
            data: result
        })
    }
)


export const OrderController = {
    createOrder, getAllOrder,
    getSingleOrder, deleteSingleOrder,
    updateSingleOrder
}