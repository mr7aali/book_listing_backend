import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CategoryRoutes } from '../modules/category/category.router';
import { BookRoutes } from '../modules/book/book.router';
import { OrderRoutes } from '../modules/order/order.router';
import { authRoutes } from '../modules/auth/auth.router';

const router = express.Router();
const moduleRoutes = [
    {
        path: '/',
        route: UserRoutes
    },
    {
        path: '/categories',
        route: CategoryRoutes
    },
    {
        path: '/books',
        route: BookRoutes
    },
    {
        path: '/orders',
        route: OrderRoutes
    },
    {
        path:'/auth',
        route:authRoutes
    }
];




moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;