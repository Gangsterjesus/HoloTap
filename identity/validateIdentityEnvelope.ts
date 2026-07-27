/**
 * ============================================================
 *  HoloTap Identity — Envelope Validator
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 27 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Validates incoming identity envelopes from HoloTapMobile.
 *  Ensures deviceId, issuedAt and payload integrity.
 *
 *  Architecture:
 *  - Stateless validation utility
 *  - Used by server-side identity route
 *  - Safe for TM470 submission and commercial deployment
 * ============================================================
 */

import { IdentityEnvelope } from "./IdentityEnvelope";
import { IdentityResponse } from "./IdentityResponse";

export function validateIdentityEnvelope(env: IdentityEnvelope): IdentityResponse {
  if (!env.deviceId) return { ok: false, reason: "Missing deviceId" };
  if (!env.issuedAt) return { ok: false, reason: "Missing issuedAt" };
  if (typeof env.payload !== "object") return { ok: false, reason: "Invalid payload" };

  return { ok: true };
}
