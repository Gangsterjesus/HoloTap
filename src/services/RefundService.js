/**
 * ============================================================
 *  HoloTap — Refund & Void Service Module
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides merchant‑facing refund and void operations for the
 *  HoloTap payment ecosystem. This module handles creation and
 *  retrieval of refund/void records stored in localStorage under
 *  the `ht_refunds` namespace.
 *
 *  Architectural Notes:
 *  - Refunds and voids DO NOT modify the main transaction ledger.
 *    Ledger entries remain immutable for audit integrity.
 *  - Refund/void records are stored separately to preserve a clean
 *    audit trail and allow merchants to view their own history.
 *  - Merchant identity is derived from tagID (public merchant ID).
 *
 *  Data Model:
 *  refundRecord / voidRecord:
 *  {
 *    refundId: string,              // rf_ / vd_ prefix + timestamp
 *    originalTransactionId: string, // transaction being refunded/voided
 *    amount: number,
 *    timestamp: number,             // ms since epoch
 *    tagID: string,                 // merchant identity
 *    type: "refund" | "void"
 *  }
 *
 *  Exports:
 *  - processRefund(transactionId)
 *  - processVoid(transactionId)
 *  - fetchRefundHistory(tagID)
 *
 * ============================================================
 */

// src/services/RefundService.js

import { loadLedger } from "./TransactionLedgerService";
import { getTagID } from "../Identity/MerchantTagStore";

/**
 * Merchant-facing refund + void operations.
 * These DO NOT write to the ledger — they write to ht_refunds only.
 */

const REFUND_KEY = "ht_refunds";

function loadRefunds() {
  return JSON.parse(localStorage.getItem(REFUND_KEY) || "[]");
}

function saveRefunds(refunds) {
  localStorage.setItem(REFUND_KEY, JSON.stringify(refunds));
}

/* -------------------------------------------------------
   Refund
------------------------------------------------------- */

export function processRefund(transactionId) {
  const logs = loadLedger();
  const refunds = loadRefunds();
  const tagID = getTagID(); // merchant identity

  const tx = logs.find((t) => t.transactionId === transactionId);
  if (!tx) return { success: false, message: "Transaction not found" };

  const refundRecord = {
    refundId: "rf_" + Date.now(),
    originalTransactionId: transactionId,
    amount: tx.amount,
    timestamp: Date.now(),
    tagID,
    type: "refund"
  };

  refunds.push(refundRecord);
  saveRefunds(refunds);

  return { success: true, message: "Refund processed successfully.", refund: refundRecord };
}

/* -------------------------------------------------------
   Void
------------------------------------------------------- */

export function processVoid(transactionId) {
  const logs = loadLedger();
  const refunds = loadRefunds();
  const tagID = getTagID();

  const tx = logs.find((t) => t.transactionId === transactionId);
  if (!tx) return { success: false, message: "Transaction not found" };

  const voidRecord = {
    refundId: "vd_" + Date.now(),
    originalTransactionId: transactionId,
    amount: tx.amount,
    timestamp: Date.now(),
    tagID,
    type: "void"
  };

  refunds.push(voidRecord);
  saveRefunds(refunds);

  return { success: true, message: "Payment voided successfully.", void: voidRecord };
}

/* -------------------------------------------------------
   Refund / Void History
------------------------------------------------------- */

export function fetchRefundHistory(tagID) {
  const refunds = loadRefunds();
  return refunds.filter((r) => r.tagID === tagID);
}

