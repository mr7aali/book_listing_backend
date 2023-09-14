import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();



router.post("/auth/signup",
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser);

router.get("/users/:id",
    auth(ENUM_USER_ROLE.ADMIN),
    
    UserController.getSingleUser);

router.get("/users",
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.getAllUser);

router.patch("/users/:id",
    validateRequest(UserValidation.UpdateUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.updateSingleUser);

router.delete("/users/:id",
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.deleteSingleUser);




export const UserRoutes = router;


