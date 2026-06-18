/**
 * Session Service
 * Responsible for generating secure HoloTap session payloads.
 */

import crypto from "crypto";

export const generateSession = () => {
  const sessionId = crypto.randomUUID();
  const createdAt = Date.now();
  const expiresIn = 120; // seconds

  // Create a secure token for QR embedding
  const token = crypto.randomBytes(32).toString("hex");

  // Optional: HMAC signature for tamper‑protection
  const signature = crypto
    .createHmac("sha256", "holotap-secret-key")
    .update(sessionId + token)
    .digest("hex");

  return {
    sessionId,
    token,
    signature,
    createdAt,
    expiresIn,
    status: "created"
  };
};
