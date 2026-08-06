/**
 * HoloTapServer
 * Flow 7 — Session Middleware
 * Author: R. Newton (Founder-Architect)
 *
 * Description:
 * Attaches the active session (if any) to the incoming request.
 * This middleware sits immediately after Flow 6 (Identity Resolver)
 * and ensures that every request has deterministic access to:
 *
 *   req.actor      (Flow 6 identity)
 *   req.session    (Flow 7 session)
 *   req.role       (actor role)
 *   req.state      (session state)
 *
 * Responsibilities:
 * - Resolve active (non-expired) sessions
 * - Bind session + role + state to the request object
 * - Maintain deterministic behaviour across all flows
 *
 * Guarantees:
 * - No destructive operations
 * - No schema mutations
 * - No domain logic inside middleware
 */

import { Request, Response, NextFunction } from 'express';
import { resolveSession } from '../identity/resolveSession';

export async function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Flow 6 must run before Flow 7
    const actor = (req as any).actor;

    if (!actor) {
      (req as any).session = null;
      (req as any).role = null;
      (req as any).state = null;
      return next();
    }

    // Resolve active session for this actor
    const session = await resolveSession({ actor_id: actor.id });

    (req as any).session = session ?? null;
    (req as any).role = session?.role ?? actor.role ?? null;
    (req as any).state = session?.state ?? null;

    return next();
  } catch (err) {
    console.error('Flow 7 Session Middleware Error:', err);

    (req as any).session = null;
    (req as any).role = null;
    (req as any).state = null;

    return next();
  }
}
