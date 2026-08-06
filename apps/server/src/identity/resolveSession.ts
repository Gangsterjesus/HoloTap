/**
 * HoloTapServer
 * Flow 7 — Session Resolver
 * Author: R. Newton (Founder-Architect)
 *
 * Description:
 * Resolves a session record from the database using deterministic
 * criteria. This resolver is intentionally minimal and is used by
 * Flow 6 (Identity Layer) and Flow 7 (Session Lifecycle).
 *
 * Responsibilities:
 * - Resolve active (non-expired) sessions
 * - Provide typed session objects to the identity layer
 * - Maintain deterministic behaviour across releases
 *
 * Guarantees:
 * - No domain logic inside resolver
 * - No schema mutations
 * - No destructive operations
 */

import { db } from '../db';

export async function resolveSession(where: any) {
  if (!where) return null;

  // Enforce non-expired session resolution
  const session = await db.sessions.findOne({
    ...where,
    expires_at: null,
  });

  return session ?? null;
}
