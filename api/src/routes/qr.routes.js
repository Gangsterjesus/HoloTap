/**
 * =============================================================================
 * File: qr.routes.js
 * Author: Raymond Newton (HoloTap Engineering)
 * Created: 08 July 2026
 * Module: QR Session Routing
 * =============================================================================
 * Purpose:
 *   Defines the Express routing layer for QR session creation. This module
 *   exposes the POST /api/qr/create endpoint, delegating all business logic to
 *   the QR controller. Ensures clean separation between routing, controller
 *   behaviour, and service-level session generation.
 *
 * Behaviour:
 *   - Accepts POST requests to /api/qr/create.
 *   - Forwards request handling to createQRSession (qr.controller.js).
 *   - Expects merchantId in the request body.
 *   - Returns JSON session payload on success.
 *   - Error handling is delegated to global middleware.
 *
 * Flows Implemented:
 *   Flow 1: Merchant QR generation → backend session creation.
 *   Flow 2: Mobile app fetches QR session → displays QR code.
 *
 * Notes:
 *   - Controller export name must match import exactly (createQRSession).
 *   - This router must be mounted BEFORE error middleware in server.js.
 *   - Part of the HoloTap QR → Session → Payment pipeline.
 *
 * Update History:
 *   08 Jul 2026: Updated import to createQRSession (removed legacy name).
 * =============================================================================
 */



import { Router } from "express";
import { createQRSession } from "../controllers/qr.controller.js";

const router = Router();

router.post("/create", createQRSession);

export default router;

