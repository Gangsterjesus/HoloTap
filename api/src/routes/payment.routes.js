import { Router } from "express";
import { createPayment, getPayment, confirmPayment } from "../controllers/payment.controller.js";

const router = Router();

router.post("/", createPayment);
router.get("/:paymentId", getPayment);
router.post("/:paymentId/confirm", confirmPayment);

export default router;
