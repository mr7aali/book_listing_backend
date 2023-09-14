import httpStatus from 'http-status';
import { Order } from "@prisma/client"
import ApiError from "../../../errors/ApiError";
import { prisma } from '../../../shared/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { type } from 'os';
import { IValidationUser } from '../../../interfaces/common';






const create = async (data: Order | any) => {

    const result = await prisma.order.create({
        data: data
    })
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create order");
    }
    return result;
};



const getAll = async (user: {
    role: string,
    userId: string
}) => {

    let whereCondition: object = {};

    if (user.role === 'customer') {
        whereCondition = {
            userId: user.userId
        }
    }

    const result = await prisma.order.findMany({
        where: whereCondition
    });


    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Does not exists");
    }
    return result;
}


const getSingle = async (user: IValidationUser, OrderId: string):Promise<Order[]>=> {


    let whereCondition :object={} ;
    if (user.role === 'customer') {
        whereCondition = {
            id:OrderId,
            userId: user.userId
        }
    }
    else{
        whereCondition={
            id:OrderId
        }
    }
    
    const result = await prisma.order.findMany({
        where:whereCondition
    })

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Does not found");
    }
    return result ;
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