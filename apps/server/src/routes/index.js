
import { Router } from "express";
import merchantRouter from "./merchant.routes.js";
import consumerRouter from "./consumer.routes.js";
import sessionRouter from "./session.routes.js";
import paymentRouter from "./payment.routes.js";

const router = Router();
console.log("Router loaded");

// Root API heartbeat
router.get("/", (req, res) => {
  res.json({
    service: "HoloTap API",
    status: "online",
    version: "1.0.0"
  });
});

// /api/health
router.get("/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// /api/version
router.get("/version", (req, res) => {
  res.json({
    api: "1.0.0",
    node: process.version
  });
});

// /api/status
router.get("/status", (req, res) => {
  res.json({
    service: "HoloTap API",
    routes: ["merchant", "consumer", "session", "payment"],
    healthy: true
  });
});

// /api/docs
router.get("/docs", (req, res) => {
  res.json({
    endpoints: {
      merchant: "/api/merchant",
      consumer: "/api/consumer",
      session: "/api/session",
      payment: "/api/payment",
      health: "/api/health",
      version: "/api/version",
      status: "/api/status"
    }
  });
});

// Sub‑routes
router.use("/merchant", merchantRouter);
router.use("/consumer", consumerRouter);
router.use("/session", sessionRouter);
router.use("/payment", paymentRouter);

export default router;
