import express from "express";
import { OrderController } from "./order.controller";


const router = express.Router();

router.post("/create-order",

    OrderController.createOrder);



router.get('/', OrderController.getAllOrder);
router.get('/:id', OrderController.getAllOrder)
router.post('/:id', OrderController.updateSingleOrder)
router.delete('/:id', OrderController.deleteSingleOrder)



export const OrderRoutes = router;