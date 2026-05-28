
// src/Utils/Session.js

const SESSION_KEY = "ht_session";
const SESSION_TTL_MILLISECONDS = 30 * 60 * 1000; // 30 minutes

export function createSession(userId) {
  const session = {
    userId,
    createdAt: Date.now(),
    lastActiveAt: Date.now()
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    const session = JSON.parse(raw);
    const now = Date.now();
    const age = now - session.lastActiveAt;

    if (age > SESSION_TTL_MILLISECONDS) {
      clearSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error("Session parse error:", error);
    clearSession();
    return null;
  }
}

export function touchSession() {
  const session = getSession();
  if (!session) {
    return null;
  }

  session.lastActiveAt = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
