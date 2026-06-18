/**
 * =============================================================================
 *  Payment Controller
 * =============================================================================
 *  Author:        R. Newton (Raymond Newton)
 *  Co‑Author:     Microsoft Copilot (AI Engineering Assistant)
 *
 *  File:          payment.controller.js
 *  Location:      /api/controllers/
 *
 *  Description:
 *  Handles all incoming HTTP requests related to payment initiation within the
 *  HoloTap backend API. This controller validates request payloads, ensures
 *  required fields are present, and delegates business logic to the Payment
 *  Service layer.
 *
 *  Responsibilities:
 *  - Validate payment initiation input.
 *  - Construct structured error responses for invalid requests.
 *  - Forward valid requests to the Payment Service.
 *  - Return consistent, predictable JSON responses to the client.
 *
 *  Version:       1.0.0
 *  Created:       18 June 2026
 * =============================================================================
 */

import { createPaymentRequest } from "../services/payment.service.js";

// -----------------------------------------------------------------------------
// POST /api/payment/initiate
// -----------------------------------------------------------------------------
// Initiates a new payment request. The incoming payload must include:
//   - amount:   The monetary value of the payment.
//   - currency: The currency code (for example: GBP, USD, EUR).
//   - sessionId: The active HoloTap session associated with the payment.
//
// If validation succeeds, the request is forwarded to the Payment Service,
// which generates a secure payment object. The response is returned with a
// 201 Created status code.
// -----------------------------------------------------------------------------
export const initiatePayment = (req, res) => {
  const { amount, currency, sessionId } = req.body;

  // Input validation
  if (!amount || !currency || !sessionId) {
    return res.status(400).json({
      message: "Missing required fields: amount, currency, sessionId"
    });
  }

  const payment = createPaymentRequest(amount, currency, sessionId);

  return res.status(201).json({
    message: "Payment initiated successfully",
    payment
  });
};
