/**
 * =============================================================================
 * File: session.controller.js
 * Author: Raymond Newton
 * Engineering: HoloTap Engineering
 * Created: 08 July 2026
 * =============================================================================
 * Purpose:
 *   Implements controller logic for creating and retrieving HoloTap sessions.
 *   Sessions represent short‑lived state objects used during QR → Session →
 *   Payment flows for both merchant and consumer roles.
 *
 * Behaviour:
 *   - createSession(req, res):
 *       • Validates role and merchantId payload.
 *       • Delegates session creation to sessionService.createSession().
 *       • Returns a structured JSON response via sendSuccess().
 *
 *   - getSession(req, res):
 *       • Retrieves a session by sessionId.
 *       • Returns 404 if session does not exist.
 *       • Returns session payload via sendSuccess().
 *
 * Notes:
 *   - All errors are passed to global error middleware via next(err).
 *   - Controller export names must match imports in session.routes.js.
 *   - Part of the HoloTap QR → Session → Payment pipeline.
 *
 * Update History:
 *   08 Jul 2026: Header added for HoloTap Engineering standards.
 * =============================================================================
 */

import { sessionService } from "../services/session.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function createSession(req, res, next) {
  try {
    const { role, merchantId } = req.body;
    const session = sessionService.createSession({ role, merchantId });
    return sendSuccess(res, 201, "Session created", session);
  } catch (err) {
    next(err);
  }
}

export function getSession(req, res, next) {
  try {
    const session = sessionService.getSession(req.params.sessionId);
    if (!session) return sendError(res, 404, "Session not found");
    return sendSuccess(res, 200, "Session retrieved", session);
  } catch (err) {
    next(err);
  }
}
