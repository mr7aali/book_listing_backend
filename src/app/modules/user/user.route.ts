import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();



router.post("/auth/signup",
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser);

router.get("/users/:id", UserController.getSingleUser);

router.get("/users", UserController.getAllUser);

router.post("/users/:id",
    validateRequest(UserValidation.UpdateUserZodSchema),
    UserController.updateSingleUser);

router.delete("/users/:id", UserController.deleteSingleUser);




export const UserRoutes = router;


