"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const category_router_1 = require("../modules/category/category.router");
const book_router_1 = require("../modules/book/book.router");
const order_router_1 = require("../modules/order/order.router");
const auth_router_1 = require("../modules/auth/auth.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/',
        route: user_route_1.UserRoutes
    },
    {
        path: '/categories',
        route: category_router_1.CategoryRoutes
    },
    {
        path: '/books',
        route: book_router_1.BookRoutes
    },
    {
        path: '/orders',
        route: order_router_1.OrderRoutes
    },
    {
        path: '/auth',
        route: auth_router_1.authRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
