// src/utils/session.js

// Create a session token for the logged‑in user
export function createSession(user) {
  const session = {
    userId: user.id,
    mobile: user.mobile,
    timestamp: Date.now(),
    token: crypto.randomUUID()
  };

  localStorage.setItem("ht_session", JSON.stringify(session));
  return session;
}

// Retrieve the current session
export function getSession() {
  return JSON.parse(localStorage.getItem("ht_session") || "null");
}

// Clear the current session
export function clearSession() {
  localStorage.removeItem("ht_session");
}
