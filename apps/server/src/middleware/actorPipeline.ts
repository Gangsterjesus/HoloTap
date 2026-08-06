// apps/server/src/middleware/actorPipeline.ts
/**
 * HoloTapServer
 * Middleware Module — Unified Actor Pipeline
 * Flow 11 — Actor Resolution & Identity Consolidation
 * Author: R. Newton (Founder-Architect)
 * Date: 2026-08-06
 *
 * Overview:
 * Provides a unified identity pipeline that consolidates actor information
 * from QR identity (Flow 6), session identity (Flow 7), org resolution
 * (Flow 8), permission roles (Flow 9), and founder override (Flow 10).
 *
 * This middleware ensures that every incoming request carries a fully
 * resolved actor object, including org, roles, and founder status, enabling
 * deterministic access control across the entire platform.
 *
 * Descriptors:
 * Module Type: Identity Consolidation Middleware
 * Layer: Flow 11 — Unified Actor Pipeline
 * Stability Level: Critical — Required for all privileged operations
 *
 * Internal Contracts:
 *   - Consumes qrActor from Flow 6 (QR Identity)
 *   - Consumes sessionActor from Flow 7 (Session Identity)
 *   - Produces req.actor (Unified Actor)
 *   - Produces req.orgId (Org Resolution)
 *   - Produces req.roles (Permission Roles)
 *   - Produces req.isFounder (Flow 10 Override)
 *
 * Guarantees:
 *   - Deterministic actor resolution
 *   - No destructive operations
 *   - No dependency on org/role/tenant correctness
 *   - Founder override always evaluated last
 */
import { Request, Response, NextFunction } from 'express';
import { resolveFounder } from '../identity/resolveFounder';

/**
 * Unified Actor Pipeline — Flow 11
 *
 * Consolidates identity from QR (Flow 6), session (Flow 7),
 * org resolution (Flow 8), permission roles (Flow 9),
 * and founder override (Flow 10).
 *
 * Produces:
 *   req.actor
 *   req.orgId
 *   req.roles
 *   req.isFounder
 */

export function actorPipeline(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // -----------------------------
  // Flow 6 — QR Identity (optional)
  // -----------------------------
  const qrActor = (req as any).qrActor || null;

  // -----------------------------
  // Flow 7 — Session Identity (optional)
  // -----------------------------
  const sessionActor = (req as any).sessionActor || null;

  // -----------------------------
  // Unified Actor Resolution
  // Priority: QR → Session → null
  // -----------------------------
  const actor = qrActor || sessionActor || null;
  (req as any).actor = actor;

  // -----------------------------
  // Flow 8 — Org Resolution
  // -----------------------------
  const orgId = actor?.orgId || null;
  (req as any).orgId = orgId;

  // -----------------------------
  // Flow 9 — Permission Roles
  // -----------------------------
  const roles = actor?.roles || [];
  (req as any).roles = roles;

  // -----------------------------
  // Flow 10 — Founder Override
  // -----------------------------
  const { isFounder } = resolveFounder(actor, req);
  (req as any).isFounder = isFounder;

  // -----------------------------
  // Flow 11 — Pipeline Complete
  // -----------------------------
  next();
}
