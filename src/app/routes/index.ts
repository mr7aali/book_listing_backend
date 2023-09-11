import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();
const moduleRoutes = [
    {
        path: '/',
        route: UserRoutes
    }
];




moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;