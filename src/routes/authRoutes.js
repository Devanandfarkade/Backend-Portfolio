import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.registerAdmin);
router.get("/me", verifyToken, authController.getProfile);

export default router;
