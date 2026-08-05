/**
 * HoloTapServer
 * Identity Middleware
 * Flow 6 — Identity Resolution Layer
 * Author: R. Newton (Founder‑Architect)
 * Date: 2026‑08‑05
 *
 * Purpose:
 *  - Attach resolved Actor identity to each incoming request.
 *  - Provide deterministic identity context for all downstream flows.
 *  - Enable founder‑only access, QR‑token identity, and audit logging.
 */

import { resolveActor } from "../identity/resolveActor";

export async function identityMiddleware(req: any, res: any, next: any) {
  req.actor = await resolveActor(req);
  next();
}
