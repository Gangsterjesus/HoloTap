/**
 * Formatting Helpers
 */

export function formatCurrency(amount) {
  return `£${Number(amount).toFixed(2)}`;
}

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}
