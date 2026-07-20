/**
 * Global User Session (Frontend)
 * Stores consumer or merchant session for routing.
 */

const KEY = "session";
const TTL = 1000 * 60 * 30; // 30 minutes

export function getSession() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);

  if (Date.now() > session.expiresAt) {
    clearSession();
    return null;
  }

  return session;
}

export function createSession(data) {
  const session = {
    ...data,
    createdAt: Date.now(),
    expiresAt: Date.now() + TTL
  };

  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function touchSession() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);
  session.expiresAt = Date.now() + TTL;

  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
