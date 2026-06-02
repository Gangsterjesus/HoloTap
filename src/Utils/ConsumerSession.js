/**
 * ============================================================
 *  HoloTap — Consumer Session Module
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides secure, isolated session management for consumers.
 *  Handles session creation, validation, expiry, refresh (touch),
 *  and clearing. Ensures consumer sessions remain separate from
 *  merchant sessions to maintain architectural integrity.
 *
 *  Architecture Notes:
 *  - Session TTL: 30 minutes (rolling expiry).
 *  - Stored in localStorage under ht_consumer_session.
 *  - Session object includes:
 *      • type: "consumer"
 *      • consumerId
 *      • fullMobile (canonical identity)
 *      • createdAt
 *      • expiresAt
 *  - Expired sessions are automatically cleared.
 *  - No business logic or UI logic is included here.
 *
 *  Dependencies:
 *  - None (pure utility module).
 *
 *  Security Notes:
 *  - Consumer sessions contain no sensitive financial data.
 *  - Merchant and consumer sessions are intentionally isolated.
 *
 * ============================================================
 */

const SESSION_KEY = "ht_consumer_session";
const SESSION_TTL = 1000 * 60 * 30; // 30 minutes

export function createConsumerSession(consumer) {
  const session = {
    type: "consumer",
    consumerId: consumer.consumerId,
    fullMobile: consumer.fullMobile,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getConsumerSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);

  if (Date.now() > session.expiresAt) {
    clearConsumerSession();
    return null;
  }

  return session;
}

export function touchConsumerSession() {
  const session = getConsumerSession();
  if (!session) return null;

  session.expiresAt = Date.now() + SESSION_TTL;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearConsumerSession() {
  localStorage.removeItem(SESSION_KEY);
}
