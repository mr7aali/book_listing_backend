import express from "express";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/create-book",
    validateRequest(BookValidation.createZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    BookController.create);



router.get('/', BookController.getAll);

router.get('/:id',
    BookController.getSingle);

router.post('/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    BookController.update);

router.delete('/:id',
    auth(ENUM_USER_ROLE.ADMIN),
    BookController.DeleteBook);



export const BookRoutes = router;