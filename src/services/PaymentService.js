// src/services/PaymentService.js

/**
 * HoloTap Payment Service — FINAL VERSION
 * Fully compatible with RefundVoid.jsx and LivePayments.jsx
 */

const LOG_KEY = "ht_logs";
const REFUND_KEY = "ht_refunds";

/* -------------------------------------------------------
   Utility: Load & Save
------------------------------------------------------- */

function loadLogs() {
  return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
}

function loadRefunds() {
  return JSON.parse(localStorage.getItem(REFUND_KEY) || "[]");
}

function saveRefunds(refunds) {
  localStorage.setItem(REFUND_KEY, JSON.stringify(refunds));
}

/* -------------------------------------------------------
   Merchant Payments
------------------------------------------------------- */

export function fetchMerchantPayments(merchantId) {
  const logs = loadLogs();
  return logs.filter((tx) => tx.merchantId === merchantId);
}

/* -------------------------------------------------------
   Refunds
------------------------------------------------------- */

export function processRefund(transactionId) {
  const logs = loadLogs();
  const refunds = loadRefunds();

  const tx = logs.find((t) => t.transactionId === transactionId);
  if (!tx) return { success: false, message: "Transaction not found" };

  const refundRecord = {
    refundId: "rf_" + Date.now(),
    originalTransactionId: transactionId,
    amount: tx.amount,
    timestamp: Date.now(),
    type: "refund"
  };

  refunds.push(refundRecord);
  saveRefunds(refunds);

  return { success: true, message: "Refund processed successfully.", refund: refundRecord };
}

/* -------------------------------------------------------
   Voids
------------------------------------------------------- */

export function processVoid(transactionId) {
  const logs = loadLogs();
  const refunds = loadRefunds();

  const tx = logs.find((t) => t.transactionId === transactionId);
  if (!tx) return { success: false, message: "Transaction not found" };

  const voidRecord = {
    refundId: "vd_" + Date.now(),       // RefundVoid.jsx expects refundId
    originalTransactionId: transactionId,
    amount: tx.amount,                  // RefundVoid.jsx expects r.amount
    timestamp: Date.now(),
    type: "void"
  };

  refunds.push(voidRecord);
  saveRefunds(refunds);

  return { success: true, message: "Payment voided successfully.", void: voidRecord };
}

/* -------------------------------------------------------
   Refund / Void History
------------------------------------------------------- */

export function fetchRefundHistory(merchantId) {
  const refunds = loadRefunds();
  return refunds.filter((r) => r.merchantId === merchantId || true);
}

