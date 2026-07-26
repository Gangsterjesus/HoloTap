/**
 * ============================================================
 *  HoloTap — Authentication: Session Management
 *  File: src/pages/auth/session/session.ts
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 26 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Provides secure client‑side session handling for authenticated
 *    merchants and admins. Stores session tokens, validates expiry,
 *    refreshes TTL, and supports role‑aware routing.
 *
 *  Responsibilities:
 *    - Create session after successful authentication
 *    - Validate session expiry
 *    - Refresh session TTL (sliding window)
 *    - Destroy session on logout
 *    - Provide merchant/admin route hints
 *    - Attach session token to API requests
 * ============================================================
 */

import { HoloTapSession } from "./session.types";
import { now, future } from "./session.utils";

// ------------------------------------------------------------
// Constants
// ------------------------------------------------------------

const SESSION_KEY = "ht_session";

// ------------------------------------------------------------
// Session Creation
// ------------------------------------------------------------

/**
 * Persist a new authenticated session.
 */
export function createSession(session: HoloTapSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

// ------------------------------------------------------------
// Session Retrieval
// ------------------------------------------------------------

/**
 * Retrieve the current session from storage.
 */
export function getSession(): HoloTapSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as HoloTapSession;
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// Session Validation
// ------------------------------------------------------------

/**
 * Check if the session exists and has not expired.
 */
export function isSessionValid(): boolean {
  const session = getSession();
  if (!session) return false;
  return now() < session.expiresAt;
}

// ------------------------------------------------------------
// Session Refresh
// ------------------------------------------------------------

/**
 * Extend session expiry using a sliding TTL window.
 */
export function refreshSession(ttlMs: number) {
  const session = getSession();
  if (!session) return;

  const updated: HoloTapSession = {
    ...session,
    expiresAt: future(ttlMs),
  };

  createSession(updated);
}

// ------------------------------------------------------------
// Session Destruction
// ------------------------------------------------------------

/**
 * Remove session from storage (logout).
 */
export function destroySession() {
  localStorage.removeItem(SESSION_KEY);
}

// ------------------------------------------------------------
// Role Routing
// ------------------------------------------------------------

/**
 * Suggest next route based on authenticated role.
 */
export function getRoleRoute(): string {
  const session = getSession();
  if (!session) return "/auth/login";

  return session.role === "admin"
    ? "/admin"
    : "/merchant/dashboard";
}

// ------------------------------------------------------------
// Auth Headers
// ------------------------------------------------------------

/**
 * Attach session token to API requests.
 */
export function authHeaders(): HeadersInit {
  const session = getSession();
  if (!session || !session.token) {
    return { "Content-Type": "application/json" };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`,
  };
}
