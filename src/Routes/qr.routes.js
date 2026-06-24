import { Router } from "express";
import { createQRSession } from "../controllers/qr.controller.js";

const router = Router();

router.post("/create", createQRSession);

export default router;
