import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
const router = express.Router();




router.post("/create-category",
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(categoryValidation.createUserZodSchema),
    CategoryController.create);


router.get("/", CategoryController.getAll);

router.get("/:id", CategoryController.getSingle);

router.patch("/:id",
    auth(ENUM_USER_ROLE.ADMIN),
    CategoryController.update);

router.delete("/:id",
    auth(ENUM_USER_ROLE.ADMIN),
    CategoryController.DeleteCatagory);


export const CategoryRoutes = router;