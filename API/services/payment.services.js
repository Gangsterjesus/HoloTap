/**
 * =============================================================================
 *  Payment Service
 * =============================================================================
 *  Author:        R. Newton (Raymond Newton)
 *  Co‑Author:     Microsoft Copilot (AI Engineering Assistant)
 *
 *  File:          payment.service.js
 *  Location:      /api/services/
 *
 *  Description:
 *  Provides all business logic required for generating secure payment request
 *  objects within the HoloTap backend API. This service is responsible for
 *  constructing structured, predictable payment payloads that can later be
 *  confirmed or rejected by the consumer.
 *
 *  Responsibilities:
 *  - Generate unique payment identifiers.
 *  - Associate payments with active HoloTap sessions.
 *  - Ensure consistent structure for all payment objects.
 *  - Prepare payment data for future persistence (database or ledger).
 *
 *  Version:       1.0.0
 *  Created:       18 June 2026
 * =============================================================================
 */

import crypto from "crypto";

/**
 * Creates a new payment request object.
 *
 * Parameters:
 *  - amount (Number):   The monetary value of the payment.
 *  - currency (String): The currency code (for example: GBP, USD, EUR).
 *  - sessionId (String): The active HoloTap session associated with the payment.
 *
 * Returns:
 *  A structured payment object containing:
 *    - paymentId: Unique identifier for the payment.
 *    - sessionId: The session that initiated the payment.
 *    - amount:    The requested payment amount.
 *    - currency:  The currency of the transaction.
 *    - createdAt: Timestamp of creation.
 *    - status:    Initial status ("pending").
 */
export const createPaymentRequest = (amount, currency, sessionId) => {
  const paymentId = crypto.randomUUID();
  const createdAt = Date.now();

  return {
    paymentId,
    sessionId,
    amount,
    currency,
    createdAt,
    status: "pending"
  };
};
