/**
 * HoloTap — QR Token Service
 * Author: Raymond Newton
 * Date: 01 June 2026
 *
 * Purpose:
 * Provides a clean, centralised interface for generating secure, single‑use,
 * time‑limited QR tokens for the HoloTap payment flow. This service wraps the
 * lower‑level AES encryption logic in Token.js and ensures consistent token
 * structure across all flows.
 *
 * Behaviour:
 * - generate(): creates a token containing amount, description, userId, ts, nonce
 * - Uses encryptPayload() from Token.js to secure the payload
 * - Returns a ready-to-encode token object for QR generation
 *
 * Security Notes:
 * - Tokens contain no sensitive card data
 * - Nonce prevents replay attacks
 * - Timestamp enables TTL enforcement in decryptPayload()
 */

import { encryptPayload } from "../Utils/Token";

export async function generateQrToken({ amount, description, userId }) {
  const payload = {
    amount,
    description: description || null,
    userId,
    ts: Date.now(),
    nonce: crypto.randomUUID() // prevents token reuse
  };

  // Encrypt using the existing Token.js AES wrapper
  const encrypted = await encryptPayload(payload);

  return encrypted; // { token: "ENCRYPTED_STRING" }
}
