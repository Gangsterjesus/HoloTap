/**
 * ============================================================
 *  HoloTap — Merchant Session Module
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides secure, isolated session management for merchants.
 *  Handles session creation, validation, expiry, refresh (touch),
 *  and clearing. Ensures merchant sessions remain separate from
 *  consumer sessions to maintain architectural integrity.
 *
 *  Architecture Notes:
 *  - Session TTL: 30 minutes (rolling expiry).
 *  - Stored in localStorage under ht_merchant_session.
 *  - Session object includes:
 *      • type: "merchant"
 *      • merchantId (internal UUID)
 *      • tagID (public merchant identifier)
 *      • createdAt
 *      • expiresAt
 *  - Expired sessions are automatically cleared.
 *  - No UI or business logic is included here.
 *
 *  Identity Model:
 *  - tagID is the canonical merchant identifier.
 *  - merchantId is used internally for session binding.
 *
 *  Dependencies:
 *  - None (pure utility module).
 *
 * ============================================================
 */

const MERCHANT_SESSION_KEY = "ht_merchant_session";
const MERCHANT_SESSION_TTL = 1000 * 60 * 30; // 30 minutes

/* -------------------------------------------------------
   Create Merchant Session
------------------------------------------------------- */
export function createMerchantSession(merchant) {
  const session = {
    type: "merchant",
    merchantId: merchant.merchantId,
    tagID: merchant.tagID,
    createdAt: Date.now(),
    expiresAt: Date.now() + MERCHANT_SESSION_TTL
  };

  localStorage.setItem(MERCHANT_SESSION_KEY, JSON.stringify(session));
  return session;
}

/* -------------------------------------------------------
   Get Merchant Session
------------------------------------------------------- */
export function getMerchantSession() {
  const raw = localStorage.getItem(MERCHANT_SESSION_KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);

  if (Date.now() > session.expiresAt) {
    clearMerchantSession();
    return null;
  }

  return session;
}

/* -------------------------------------------------------
   Touch Merchant Session (extend expiry)
------------------------------------------------------- */
export function touchMerchantSession() {
  const session = getMerchantSession();
  if (!session) return null;

  session.expiresAt = Date.now() + MERCHANT_SESSION_TTL;
  localStorage.setItem(MERCHANT_SESSION_KEY, JSON.stringify(session));
  return session;
}

/* -------------------------------------------------------
   Clear Merchant Session
------------------------------------------------------- */
export function clearMerchantSession() {
  localStorage.removeItem(MERCHANT_SESSION_KEY);
}
