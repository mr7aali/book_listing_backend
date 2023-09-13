import express from "express";
import { OrderController } from "./order.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";


const router = express.Router();

router.post("/create-order",
    auth(ENUM_USER_ROLE.CUSTOMER),
    OrderController.createOrder);

router.get('/',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    OrderController.getAllOrder);
router.get('/:id',
    auth(ENUM_USER_ROLE.CUSTOMER),
    OrderController.getSingleOrder);

router.post('/:id',
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    OrderController.updateSingleOrder);
    
router.delete('/:id', OrderController.deleteSingleOrder)



export const OrderRoutes = router;