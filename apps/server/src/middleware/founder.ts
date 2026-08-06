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

import { Request, Response, NextFunction } from 'express';
import { resolveFounder } from '../identity/resolveFounder';

/**
 * HoloTapServer
 * Founder Access Middleware — Creator Mode
 * Flow 10 — Founder Override Layer
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-06
 */

export function founderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const actor = (req as any).actor;
  const { isFounder } = resolveFounder(actor, req);

  (req as any).isFounder = isFounder;

  next();
}

export function requireFounder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(req as any).isFounder) {
    return res.status(403).json({
      ok: false,
      error: 'FOUNDER_REQUIRED',
    });
  }

  next();
}
