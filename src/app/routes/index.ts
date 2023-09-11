import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CategoryRoutes } from '../modules/category/category.router';

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
];




moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;