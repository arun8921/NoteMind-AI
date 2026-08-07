import { Router } from "express";
import { summarize, rewrite, grammar, explain, quiz, chat } from "../controllers/aiController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.post("/summarize", summarize);
router.post("/rewrite", rewrite);
router.post("/grammar", grammar);
router.post("/explain", explain);
router.post("/quiz", quiz);
router.post("/chat", chat);

export default router;
