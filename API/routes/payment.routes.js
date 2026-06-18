/**
 * =============================================================================
 *  Payment Routes
 * =============================================================================
 *  Author:        R. Newton (Raymond Newton)
 *  Co‑Author:     Microsoft Copilot (AI Engineering Assistant)
 *
 *  File:          payment.routes.js
 *  Location:      /api/routes/
 *
 *  Description:
 *  Defines all HTTP endpoints related to payment initiation and payment
 *  processing within the HoloTap backend API. These routes are mounted under
 *  the base path "/api/payment" by the server entry point.
 *
 *  Responsibilities:
 *  - Accept incoming payment initiation requests.
 *  - Forward requests to the Payment Controller.
 *  - Maintain clean separation between routing, controller logic, and services.
 *
 *  Version:       1.0.0
 *  Created:       18 June 2026
 * =============================================================================
 */

import { Router } from "express";
import { initiatePayment } from "../controllers/payment.controller.js";

const router = Router();

// -----------------------------------------------------------------------------
// POST /api/payment/initiate
// -----------------------------------------------------------------------------
// Initiates a new payment request. The controller validates the incoming
// payload and delegates business logic to the Payment Service layer.
// -----------------------------------------------------------------------------
router.post("/initiate", initiatePayment);

export default router;
