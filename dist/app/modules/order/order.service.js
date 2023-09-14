"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = require("../../../shared/prisma");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.create({
        data: data
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create order");
    }
    return result;
});
const getAll = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let whereCondition = {};
    if (user.role === 'customer') {
        whereCondition = {
            userId: user.userId
        };
    }
    const result = yield prisma_1.prisma.order.findMany({
        where: whereCondition
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Does not exists");
    }
    return result;
});
const getSingle = (user, OrderId) => __awaiter(void 0, void 0, void 0, function* () {
    let whereCondition = {};
    if (user.role === 'customer') {
        whereCondition = {
            id: OrderId,
            userId: user.userId
        };
    }
    else {
        whereCondition = {
            id: OrderId
        };
    }
    const result = yield prisma_1.prisma.order.findMany({
        where: whereCondition
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Does not found");
    }
    return result;
});
const updateSingle = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.update({
        where: {
            id: id
        },
        data
    });
    return result;
});
const deleteSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.delete({
        where: {
            id: id
        }
    });
    return result;
});
exports.OrderService = {
    create, getAll, deleteSingle,
    getSingle, updateSingle
};
