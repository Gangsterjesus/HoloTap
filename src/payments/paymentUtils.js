// paymentUtils.js

/**
 * Formats a payment payload for QR code generation.
 * Includes recipient, amount, currency, timestamp, and optional metadata.
 */
export function formatPaymentPayload({ recipient, amount, currency = 'GBP', metadata = {} }) {
  return JSON.stringify({
    recipient,
    amount,
    currency,
    timestamp: Date.now(),
    ...metadata,
  });
}

/**
 * Generates a simple hash for anti-fraud or holographic sticker verification.
 * Replace with a proper cryptographic hash in production.
 */
export function generateVerificationHash(payload) {
  const base = `${payload.recipient}-${payload.amount}-${payload.timestamp}`;
  return btoa(base).slice(0, 16); // Basic obfuscation, not secure
}

/**
 * Validates basic payment input before QR generation.
 */
export function validatePaymentInput({ recipient, amount }) {
  if (!recipient || typeof recipient !== 'string') return 'Recipient is required';
  if (!amount || isNaN(amount) || amount <= 0) return 'Amount must be a positive number';
  return null;
}