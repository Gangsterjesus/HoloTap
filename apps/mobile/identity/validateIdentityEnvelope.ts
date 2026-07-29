/**
 * ============================================================
 *  HoloTap Identity — Envelope Validator (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: validateIdentityEnvelope.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Validates the identity envelope before it is encrypted and
 *  submitted during Flow 6 → Flow 7 → Flow 8.
 *
 *  VALIDATION RULES:
 *    • deviceId must exist and be a non-empty string
 *    • issuedAt must be a valid number
 *    • payload must be a plain object
 *
 *  NOTES:
 *  - Mobile‑only identity layer
 *  - Pure TypeScript
 *  - Deterministic, no generics
 * ============================================================
 */

import { IdentityEnvelope } from "./IdentityEnvelope";
import { IdentityResponse } from "./IdentityResponse";

export function validateIdentityEnvelope(
  env: IdentityEnvelope
): IdentityResponse {
  if (!env.deviceId || typeof env.deviceId !== "string") {
    return {
      valid: false,
      message: "Missing or invalid deviceId",
    };
  }

  if (!env.issuedAt || typeof env.issuedAt !== "number") {
    return {
      valid: false,
      message: "Missing or invalid issuedAt timestamp",
    };
  }

  if (typeof env.payload !== "object" || env.payload === null) {
    return {
      valid: false,
      message: "Invalid payload structure",
    };
  }

  return {
    valid: true,
    payload: env.payload,
  };
}
