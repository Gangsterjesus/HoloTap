/**
 * ============================================================
 *  HoloTap — Web API Client (Browser-Safe)
 *  File: src/services/api.js
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 * ============================================================
 *
 *  Purpose:
 *    Deterministic, browser-safe API layer for the HoloTap web UI.
 *    All functions use fetch() and return JSON. No server-side
 *    modules or Node.js logic are used here.
 *
 *  Responsibilities:
 *    - Wrap HTTP requests
 *    - Provide predictable JSON responses
 *    - Maintain stateless v2 architecture
 * ============================================================
 */

const BASE_URL = "/api";

/* ============================
   GENERIC REQUEST WRAPPER
   ============================ */
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/* ============================
   PAYMENTS API
   ============================ */
export async function getPayments() {
  return request("/payments");
}

/* ============================
   QR ACTIVATION API
   ============================ */
export async function activateQR(payload) {
  return request("/qr/activate", {
    method: "POST",
    body: payload
  });
}

/* ============================
   SESSION API
   ============================ */
export async function getSession(sessionId) {
  return request(`/session/${sessionId}`);
}

/* ============================
   SESSION VERIFY API
   (Required by Dashboard.jsx)
   ============================ */
export async function verifySession(sessionId) {
  return request(`/session/verify/${sessionId}`);
}

/* ============================
   EXPORT (DETERMINISTIC)
   ============================ */
export const api = {
  getPayments,
  activateQR,
  getSession,
  verifySession,
};
