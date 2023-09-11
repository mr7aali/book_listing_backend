import express from "express";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/create-book",
    validateRequest(BookValidation.createZodSchema),
    BookController.create);



router.get('/', BookController.getAll);
router.get('/:id',BookController.getSingle)
router.post('/:id',BookController.update)
router.delete('/:id',BookController.DeleteBook)



export const BookRoutes = router;