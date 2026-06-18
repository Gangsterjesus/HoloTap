import { Router } from "express";
import { createSession, getSession } from "../controllers/session.controller.js";

const router = Router();

router.post("/", createSession);
router.get("/:sessionId", getSession);

export default router;
