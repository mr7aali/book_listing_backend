import httpStatus from 'http-status';
import { Order } from "@prisma/client"
import ApiError from "../../../errors/ApiError";
import { prisma } from '../../../shared/prisma';






const create = async (data: Order|any) => {
 
    const result = await prisma.order.create({
        data: data
    })
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create order");
    }


    return result;


};


const getAll = async () => {
    const result = await prisma.order.findMany({});

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Does not exists");
    }
    return result;
}


const getSingle = async (id: string): Promise<Order> => {
    const result = await prisma.order.findUnique({
        where: {
            id: id
        }
    })

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Does not found");
    }
    return result;
}
const updateSingle = async (id: string, data: Order | any) => {

    const result = await prisma.order.update({
        where: {
            id: id
        },
        data
    })
    return result
}
const deleteSingle = async (id: string) => {

    const result = await prisma.order.delete({
        where: {
            id: id
        }
    })
    return result
}


export const OrderService = {
    create, getAll, deleteSingle,
    getSingle, updateSingle
}