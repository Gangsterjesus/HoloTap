/**
 * ============================================================
 *  HoloTap — Merchant Refund / Void Screen
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides merchant operators with the ability to:
 *    • View recent consumer payments
 *    • Select a transaction
 *    • Perform a refund or void operation
 *    • View historical refund/void activity
 *
 *  Architecture Notes:
 *  - Uses tagID (public merchant identifier) for all lookups.
 *  - Payment retrieval handled by PaymentService.js.
 *  - Refund and void operations handled by RefundService.js.
 *  - Ledger writes are restricted to TransactionLedgerService.js.
 *  - UI contains no business logic — all operations delegated to services.
 *  - Session validation uses Merchant Session module (not consumer session).
 *
 *  Identity Model:
 *  - Merchant identity is represented by tagID.
 *  - Refunds and voids are always associated with merchant tagID.
 *
 *  Dependencies:
 *  - PaymentService.js (fetchMerchantPayments)
 *  - RefundService.js (processRefund, processVoid, fetchRefundHistory)
 *  - UserService.js (getUser → provides tagID)
 *  - Session.js (merchant session validation)
 *
 *  Security Notes:
 *  - Refunds and voids are irreversible ledger operations.
 *  - All actions require an active merchant session.
 *
 * ============================================================
 */


import { useEffect, useState } from "react";
import { getSession, touchSession } from "../Utils/Session";
import { getUser } from "../services/UserService";
import { fetchMerchantPayments } from "../services/paymentService";
import {
  processRefund,
  processVoid,
  fetchRefundHistory
} from "../services/RefundService";

export default function RefundVoid({ setFlow }) {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [refundHistory, setRefundHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  /* -------------------------------------------------------
     Session Gate
  ------------------------------------------------------- */
  useEffect(() => {
    const session = getSession();
    if (!session) {
      alert("Your session has expired. Please log in again.");
      setFlow(2);
      return;
    }
    touchSession();
  }, [setFlow]);

  /* -------------------------------------------------------
     Load Merchant + Payments + Refund History
  ------------------------------------------------------- */
  useEffect(() => {
    const u = getUser();
    setUser(u);

    if (u && u.tagID) {
      fetchMerchantPayments(u.tagID).then((data) => setPayments(data || []));
      fetchRefundHistory(u.tagID).then((data) => setRefundHistory(data || []));
    }
  }, []);

  /* -------------------------------------------------------
     Actions
  ------------------------------------------------------- */
  function handleVoid(tx) {
    processVoid(tx.transactionId).then((result) => {
      setMessage(result.message || "Payment voided successfully.");
      setSelected(null);

      if (user?.tagID) {
        fetchRefundHistory(user.tagID).then((data) => setRefundHistory(data || []));
      }
    });
  }

  function handleRefund(tx) {
    processRefund(tx.transactionId).then((result) => {
      setMessage(result.message || "Refund processed successfully.");
      setSelected(null);

      if (user?.tagID) {
        fetchRefundHistory(user.tagID).then((data) => setRefundHistory(data || []));
      }
    });
  }

  /* -------------------------------------------------------
     No Merchant Loaded
  ------------------------------------------------------- */
  if (!user) {
    return (
      <div className="refund__container">
        <h2 className="refund__title">Refund / Void</h2>
        <p>No merchant profile found.</p>

        <button className="cta__button" onClick={() => setFlow(1)}>
          Go to Registration
        </button>
      </div>
    );
  }

  /* -------------------------------------------------------
     Main UI
  ------------------------------------------------------- */
  return (
    <div className="refund__container">
      <h2 className="refund__title">Refund / Void</h2>
      <p className="refund__subtitle">Manage refunds and void transactions.</p>

      {message && <p className="refund__message">{message}</p>}

      {/* Payment List */}
      <div className="refund__list">
        <h3>Recent Payments</h3>

        {payments.length === 0 && (
          <p className="refund__empty">No payments available.</p>
        )}

        {payments.map((p) => (
          <div
            key={p.transactionId}
            className={`refund__item ${
              selected?.transactionId === p.transactionId ? "refund__item--selected" : ""
            }`}
            onClick={() => setSelected(p)}
          >
            <div className="refund__row">
              <span className="refund__amount">£{p.amount.toFixed(2)}</span>
              <span className={`refund__status refund__status--${p.status.toLowerCase()}`}>
                {p.status}
              </span>
            </div>

            <div className="refund__details">
              <p><strong>Consumer:</strong> {p.consumerName || "Anonymous"}</p>
              <p><strong>Time:</strong> {new Date(p.timestamp).toLocaleString()}</p>
              <p><strong>ID:</strong> {p.transactionId}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {selected && (
        <div className="refund__actions">
          <h3>Actions for Selected Payment</h3>

          <button
            className="cta__button refund__void"
            onClick={() => handleVoid(selected)}
          >
            Void Payment
          </button>

          <button
            className="cta__button refund__refund"
            onClick={() => handleRefund(selected)}
          >
            Refund Payment
          </button>
        </div>
      )}

      {/* Refund History */}
      <div className="refund__history">
        <h3>Refund History</h3>

        {refundHistory.length === 0 && (
          <p className="refund__empty">No refunds processed yet.</p>
        )}

        {refundHistory.map((r) => (
          <div key={r.refundId} className="refund__item">
            <div className="refund__row">
              <span className="refund__amount">£{r.amount.toFixed(2)}</span>
              <span className="refund__status refund__status--refunded">
                {r.type === "void" ? "Voided" : "Refunded"}
              </span>
            </div>

            <div className="refund__details">
              <p><strong>Original Tx:</strong> {r.originalTransactionId}</p>
              <p><strong>Time:</strong> {new Date(r.timestamp).toLocaleString()}</p>
              <p><strong>ID:</strong> {r.refundId}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="cta__button refund__back"
        onClick={() => setFlow(5)}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
