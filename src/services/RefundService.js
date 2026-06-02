// src/services/RefundService.js

import { loadLedger } from "./TransactionLedgerService";
import { getTagID } from "../identity/MerchantTagStore";

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
    tagID,          // merchant identity
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
  const tagID = getTagID(); // merchant identity

  const tx = logs.find((t) => t.transactionId === transactionId);
  if (!tx) return { success: false, message: "Transaction not found" };

  const voidRecord = {
    refundId: "vd_" + Date.now(), // RefundVoid.jsx expects refundId
    originalTransactionId: transactionId,
    amount: tx.amount,
    timestamp: Date.now(),
    tagID,          // merchant identity
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
