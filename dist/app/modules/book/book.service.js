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
exports.BookService = void 0;
const prisma_1 = require("./../../../shared/prisma");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_interface_1 = require("./book.interface");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.create({
        data: data,
        include: {
            category: true
        }
    });
    return result;
});
const getAll = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(paginationOption.page) || 1;
    const limit = Number(paginationOption.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = paginationOption.sortBy || 'publicationDate';
    const sortOrder = paginationOption.sortOrder || 'asc';
    const searchTerm = filters.searchTerm;
    const minPrice = Number(filters.minPrice);
    const maxPrice = Number(filters.maxPrice);
    delete filters.searchTerm;
    delete filters.maxPrice;
    delete filters.minPrice;
    const sortCondition = {};
    const andConditions = [];
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    if (searchTerm) {
        andConditions.push({
            OR: book_interface_1.BookSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }
    ;
    if (minPrice) {
        andConditions.push({
            price: {
                gt: minPrice
            }
        });
    }
    ;
    if (maxPrice) {
        andConditions.push({
            price: {
                lt: maxPrice
            }
        });
    }
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map((key) => ({
                [key]: {
                    equals: filters[key]
                }
            }))
        });
    }
    ;
    const whereCondition = andConditions.length > 0 ?
        {
            AND: andConditions
        }
        : {};
    //!  Find  query 
    const result = yield prisma_1.prisma.book.findMany({
        where: whereCondition,
        take: limit,
        skip,
        orderBy: sortCondition
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book not exists");
    }
    const total = yield prisma_1.prisma.book.count({ where: whereCondition });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page: page, size: limit, total, totalPage
        },
        data: result
    };
});
const getBookByCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const result = yield prisma_1.prisma.book.findMany({
        take: limit, skip,
        where: {
            categoryId: {
                equals: id,
            },
        },
        orderBy: {
            price: 'asc',
        }
    });
    const total = yield prisma_1.prisma.book.count({
        where: {
            categoryId: {
                equals: id,
            },
        },
    });
    const totalPage = Math.ceil(total / limit);
    return {
        data: result,
        meta: {
            page,
            size: limit,
            total: total,
            totalPage
        }
    };
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.findUnique({
        where: {
            id
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book not exists");
    }
    return result;
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.update({
        where: {
            id
        },
        data
    });
    return result;
});
const DeleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.book.delete({
        where: {
            id
        }
    });
    return result;
});
exports.BookService = {
    create, getAll, DeleteBook,
    getSingle, update, getBookByCategory
};
