/**
 * ============================================================
 *  HoloTap Identity — Envelope Builder
 *  Engineer: Raymond Newton (E5357171)
 *
 *  Date: 27 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Constructs a validated identity envelope containing:
 *  - deviceId
 *  - issuedAt timestamp
 *  - payload (merchant or system data)
 *
 *  Architecture:
 *  - Stateless utility
 *  - JSON-safe envelope structure
 *  - Used by HoloTapMobile → HoloTapServer transport layer
 * ============================================================
 */

import { IdentityEnvelope } from "./IdentityEnvelope";

/**
 * Envelope Builder
 * Creates a transport-safe identity envelope for server submission.
 */
export function buildIdentityEnvelope(
  deviceId: string,
  payload: Record<string, unknown>
): IdentityEnvelope {
  return {
    deviceId,
    issuedAt: Date.now(),
    payload,
  };
}
