import express from "express";
import { authController } from "../controllers/index.js";
import { authMiddleware } from "../middleware/index.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.me);

export default router;