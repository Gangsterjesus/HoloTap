
/**
 * Formats a HoloTap payment payload for holographic QR generation.
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
 * Generates a basic verification hash for hologram sticker validation.
 * Replace with a secure cryptographic hash in production.
 */
export function generateVerificationHash(payload) {
  const base = `${payload.recipient}-${payload.amount}-${payload.timestamp}`;
  return btoa(base).slice(0, 16); // Basic obfuscation, not secure
}

/**
 * Validates HoloTap payment input before QR/hologram generation.
 */
export function validatePaymentInput({ recipient, amount }) {
  if (!recipient || typeof recipient !== 'string') return 'Recipient is required';
  if (!amount || isNaN(amount) || amount <= 0) return 'Amount must be a positive number';
  return null;
}