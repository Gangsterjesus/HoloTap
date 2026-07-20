import { Router } from "express";
import { createConsumer } from "../controllers/consumer.controller.js";

const router = Router();

router.post("/", createConsumer);

export default router;
