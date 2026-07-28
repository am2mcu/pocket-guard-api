import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import userRole from "../utils/userRole.js";

const router = Router();

router.post("/signup", authenticate, authorize(userRole.ADMIN), signup);
router.post("/login", login);

export default router;
