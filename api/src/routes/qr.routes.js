import { Router } from "express";
import { createQrSessionController } from "../controllers/qr.controller.js";

const router = Router();

router.post("/create", createQrSessionController);

export default router;
