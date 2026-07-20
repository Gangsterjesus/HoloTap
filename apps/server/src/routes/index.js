import { Router } from "express";
import merchantRouter from "./merchant.routes.js";
import consumerRouter from "./consumer.routes.js";
import sessionRouter from "./session.routes.js";
import paymentRouter from "./payment.routes.js";

const router = Router();

router.use("/merchant", merchantRouter);
router.use("/consumer", consumerRouter);
router.use("/session", sessionRouter);
router.use("/payment", paymentRouter);

export default router;
