import { Router } from "express";
import { register, login, me, updateMe, logout, checkAdmin } from "../controllers/authController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.patch("/me", requireAuth, updateMe);
router.get("/check-admin", requireAuth, requireAdmin, checkAdmin);

export default router;
