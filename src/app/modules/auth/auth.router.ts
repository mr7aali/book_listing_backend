import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidaton } from "./auth.validation";

const router = express.Router();


router.post("/login",
    validateRequest(AuthValidaton.authZodSchema),
AuthController.login);
router.post("/refresh-token",
    validateRequest(AuthValidaton.refreshTokenZodSchema),
AuthController.refreshToken)





export const authRoutes = router;