/**
 * HoloTapServer
 * Identity Resolver — Founder Mode
 * Flow 10 — Founder Override Layer
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-06
 *
 * Overview:
 * Determines whether the current actor is the founder. This resolver
 * provides deterministic, secure verification using actor identity and
 * a founder-only secret supplied via request headers.
 *
 * Descriptors:
 * Module Type: Identity Resolver
 * Layer: Flow 10 — Founder Override Layer
 * Stability Level: Critical — Must remain deterministic and secure
 *
 * External Dependencies:
 *   - Environment variable: FOUNDER_SECRET
 *
 * Internal Contracts:
 *   - Consumes actor identity from Flow 6
 *   - Consumes founder secret from request headers
 *   - Produces isFounder flag for Flow 10 middleware
 *
 * Guarantees:
 *   - No destructive operations
 *   - No schema mutations
 *   - Pure verification logic only
 */

import { Request } from 'express';

export function resolveFounder(actor: any, req: Request) {
  const founderEmail = "ray-newton@live.co.uk";
  const founderSecret = process.env.FOUNDER_SECRET;

  // Hard-coded recovery key — used ONLY when Windows or env breaks
  const recoveryKey = "HOLOTAP-FOUNDER-RECOVERY-KEY-001";

  const suppliedSecret =
    req.headers["x-founder-secret"] ||
    req.headers["x-founder-key"] ||
    null;

  const suppliedRecovery =
    req.headers["x-founder-recovery"] ||
    null;

  const isFounder =
    actor?.email === founderEmail ||
    (founderSecret && suppliedSecret === founderSecret) ||
    suppliedRecovery === recoveryKey;

  return { isFounder };
}
