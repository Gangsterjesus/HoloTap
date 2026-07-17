/**
 * Consumer Session (Frontend)
 * Stores consumer session for routing.
 */

const KEY = "consumerSession";
const TTL = 1000 * 60 * 30;

export function getConsumerSession() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);

  if (Date.now() > session.expiresAt) {
    clearConsumerSession();
    return null;
  }

  return session;
}

export function createConsumerSession(consumer) {
  const session = {
    consumerId: consumer.consumerId,
    name: consumer.name,
    createdAt: Date.now(),
    expiresAt: Date.now() + TTL
  };

  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function touchConsumerSession() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);
  session.expiresAt = Date.now() + TTL;

  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function clearConsumerSession() {
  localStorage.removeItem(KEY);
}
