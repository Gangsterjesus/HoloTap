/**
 * TransactionLedgerService.js
 * System‑level ledger operations for administrators.
 * 
 * Responsibilities:
 * - Load and save the global transaction ledger (ht_logs)
 * - Append new transactions
 * - Delete transactions
 * - Provide full audit trail access
 */

const LOG_KEY = "ht_logs";

/* -------------------------------------------------------
   Load & Save Ledger
------------------------------------------------------- */

export function loadLedger() {
  return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
}

export function saveLedger(logs) {
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

/* -------------------------------------------------------
   Append a new transaction
------------------------------------------------------- */

export function appendTransaction(tx) {
  const logs = loadLedger();
  logs.push(tx);
  saveLedger(logs);
  return tx;
}

/* -------------------------------------------------------
   Delete a transaction (admin‑only)
------------------------------------------------------- */

export function deleteTransaction(transactionId) {
  const logs = loadLedger();
  const filtered = logs.filter((t) => t.transactionId !== transactionId);
  saveLedger(filtered);
  return { success: true };
}

/* -------------------------------------------------------
   Full audit trail
------------------------------------------------------- */

export function getAuditTrail() {
  return loadLedger();
}
