import { apiRequest } from "./api";

/**
 * Create a new payment request for a consumer.
 * Backend route: POST /api/payment
 *
 * Parameters:
 *  - sessionId (String): The active consumer session ID.
 *  - amount (Number): The payment amount.
 */
export function createPayment(sessionId, amount) {
  return apiRequest("/api/payment", {
    method: "POST",
    body: JSON.stringify({ sessionId, amount }),
  });
}

/**
 * Confirm a payment (merchant approval).
 * Backend route: POST /api/payment/:paymentId/confirm
 *
 * Parameters:
 *  - paymentId (String): The payment ID to confirm.
 */
export function confirmPayment(paymentId) {
  return apiRequest(`/api/payment/${paymentId}/confirm`, {
    method: "POST",
  });
}
