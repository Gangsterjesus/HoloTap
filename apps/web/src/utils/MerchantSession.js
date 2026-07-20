/**
 * Merchant Session (Frontend)
 * Stores merchant session in localStorage for SPA routing.
 */

const KEY = "merchantSession";
const TTL = 1000 * 60 * 30; // 30 minutes

export function getMerchantSession() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);

  if (Date.now() > session.expiresAt) {
    clearMerchantSession();
    return null;
  }

  return session;
}

export function createMerchantSession(merchant) {
  const session = {
    merchantId: merchant.merchantId,
    tagID: merchant.tagID,
    createdAt: Date.now(),
    expiresAt: Date.now() + TTL
  };

  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function touchMerchantSession() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  const session = JSON.parse(raw);
  session.expiresAt = Date.now() + TTL;

  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function clearMerchantSession() {
  localStorage.removeItem(KEY);
}
