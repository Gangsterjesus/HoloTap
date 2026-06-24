import { Router } from "express";
import qrRoutes from "./qr.routes.js";

const router = Router();

// API ROUTES
router.use("/qr", qrRoutes);

export default router;
