import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
const router = express.Router();




router.post("/create-category",
    validateRequest(categoryValidation.createUserZodSchema),
    CategoryController.create);


router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getSingle);

router.post("/:id", CategoryController.update);
router.delete("/:id", CategoryController.DeleteCatagory);


export const CategoryRoutes = router;