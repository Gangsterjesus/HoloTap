/**
 * ============================================================
 *  HoloTap — Transaction Ledger Service
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a persistent, append‑only transaction ledger for all
 *  HoloTap payment events. This ledger is the authoritative audit
 *  trail for merchants, administrators, and system integrity.
 *
 *  Architectural Notes:
 *  - Ledger entries are immutable once written.
 *  - Refunds and voids DO NOT modify the ledger; they are stored
 *    separately in RefundService.js under `ht_refunds`.
 *  - Ledger is stored in localStorage under `ht_logs`.
 *  - All entries include merchant tagID for identity scoping.
 *
 *  Ledger Entry Structure:
 *  {
 *    transactionId: string,
 *    amount: number,
 *    timestamp: number,
 *    tagID: string,          // merchant identity
 *    consumerId: string,     // optional
 *    type: "payment"
 *  }
 *
 *  Exports:
 *  - loadLedger()
 *  - saveLogs(entry)
 *
 * ============================================================
 */

// src/services/TransactionLedgerService.js

const LEDGER_KEY = "ht_logs";

/* -------------------------------------------------------
   Load Ledger
------------------------------------------------------- */

export function loadLedger() {
  try {
    return JSON.parse(localStorage.getItem(LEDGER_KEY) || "[]");
  } catch {
    return [];
  }
}

/* -------------------------------------------------------
   Append to Ledger (saveLogs)
------------------------------------------------------- */

export function saveLogs(entry) {
  const logs = loadLedger();

  const record = {
    ...entry,
    timestamp: entry.timestamp || Date.now()
  };

  logs.push(record);
  localStorage.setItem(LEDGER_KEY, JSON.stringify(logs));

  return record;
}
