import { Router } from "express";
import { createSession, getSession } from "../controllers/session.controller.js";

const router = Router();

router.post("/", (req, res, next) => {
  console.log("[SESSION] Create request:", req.body);
  next();
}, createSession);

router.get("/:sessionId", (req, res, next) => {
  console.log("[SESSION] Fetch request:", req.params.sessionId);
  next();
}, getSession);

export default router;
