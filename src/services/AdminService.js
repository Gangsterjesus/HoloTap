/**
 * AdminService.js
 * High‑level admin operations built on top of TransactionLedgerService.
 */

import {
  loadLedger,
  saveLedger,
  appendTransaction,
  deleteTransaction,
  getAuditTrail
} from "./TransactionLedgerService";

/* -------------------------------------------------------
   Admin: View all transactions
------------------------------------------------------- */

export function adminGetAllTransactions() {
  return loadLedger();
}

/* -------------------------------------------------------
   Admin: Export ledger (placeholder)
------------------------------------------------------- */

export function adminExportLedger() {
  const logs = loadLedger();
  return JSON.stringify(logs, null, 2);
}

/* -------------------------------------------------------
   Admin: Purge ledger
------------------------------------------------------- */

export function adminClearLedger() {
  saveLedger([]);
  return { success: true };
}

/* -------------------------------------------------------
   Admin: Append manual correction
------------------------------------------------------- */

export function adminAppendManualEntry(entry) {
  return appendTransaction({
    ...entry,
    transactionId: "admin_" + Date.now(),
    timestamp: Date.now(),
    admin: true
  });
}

/* -------------------------------------------------------
   Admin: Delete a transaction
------------------------------------------------------- */

export function adminDeleteTransaction(transactionId) {
  return deleteTransaction(transactionId);
}

/* -------------------------------------------------------
   Admin: Full audit trail
------------------------------------------------------- */

export function adminAuditTrail() {
  return getAuditTrail();
}
