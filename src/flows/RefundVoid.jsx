/**
 * ============================================================
 *  HoloTap — Refund / Void Payment Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Allows merchants to void or refund payments from an active
 *  session. Displays recent payments and refund history.
 *
 *  Architecture Notes:
 *  - Loads merchant session via MerchantSession.js.
 *  - Fetches payments via paymentService.js.
 *  - Processes refunds/voids via RefundService.js.
 *  - Navigation controlled by React Router.
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - All imports validated for case‑sensitivity.
 *  - Backend‑ready for real refund/void operations.
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMerchantSession as getSession,
  touchMerchantSession as touchSession
} from "./utils/MerchantSession.js";
import {
  fetchMerchantPayments
} from "../services/paymentService.js";
import {
  processRefund,
  processVoid,
  fetchRefundHistory
} from "../services/RefundService.js";

export default function RefundVoid() {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [payments, setPayments] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [message, setMessage] = useState("");

  // Load merchant session
  useEffect(() => {
    const s = getSession();
    if (!s) return;

    setSession(s);
    touchSession();
  }, []);

  // Load payments + refund history
  useEffect(() => {
    if (!session) return;

    fetchMerchantPayments(session.merchantId).then((data) => {
      setPayments(data || []);
    });

    fetchRefundHistory(session.merchantId).then((data) => {
      setRefunds(data || []);
    });
  }, [session]);

  const handleRefund = async (paymentId) => {
    setMessage("");

    const result = await processRefund(paymentId);

    if (result?.success) {
      setMessage("Refund processed successfully.");
      refreshData();
    } else {
      setMessage("Refund failed.");
    }
  };

  const handleVoid = async (paymentId) => {
    setMessage("");

    const result = await processVoid(paymentId);

    if (result?.success) {
      setMessage("Payment voided successfully.");
      refreshData();
    } else {
      setMessage("Void failed.");
    }
  };

  const refreshData = () => {
    if (!session) return;

    fetchMerchantPayments(session.merchantId).then((data) => {
      setPayments(data || []);
    });

    fetchRefundHistory(session.merchantId).then((data) => {
      setRefunds(data || []);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Refund / Void Payments</h2>

      {!session && (
        <p style={{ marginTop: 10, color: "red" }}>
          No active merchant session found.
        </p>
      )}

      {message && (
        <p style={{ marginTop: 10, color: "#00eaff" }}>{message}</p>
      )}

      {/* Recent Payments */}
      <h3 style={{ marginTop: 30 }}>Recent Payments</h3>

      {payments.length === 0 && (
        <p>No payments available.</p>
      )}

      {payments.map((p) => (
        <div
          key={p.transactionId}
          style={{
            background: "#222",
            padding: 15,
            borderRadius: 8,
            marginBottom: 15
          }}
        >
          <p><strong>Amount:</strong> £{p.amount.toFixed(2)}</p>
          <p><strong>Status:</strong> {p.status}</p>
          <p><strong>Consumer:</strong> {p.consumerName || "Anonymous"}</p>
          <p><strong>ID:</strong> {p.transactionId}</p>

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <button
              className="cta__button"
              onClick={() => handleRefund(p.transactionId)}
            >
              Refund
            </button>

            <button
              className="cta__button"
              onClick={() => handleVoid(p.transactionId)}
            >
              Void
            </button>
          </div>
        </div>
      ))}

      {/* Refund History */}
      <h3 style={{ marginTop: 40 }}>Refund History</h3>

      {refunds.length === 0 && (
        <p>No refund history available.</p>
      )}

      {refunds.map((r) => (
        <div
          key={r.refundId}
          style={{
            background: "#111",
            padding: 15,
            borderRadius: 8,
            marginBottom: 15
          }}
        >
          <p><strong>Refund ID:</strong> {r.refundId}</p>
          <p><strong>Payment ID:</strong> {r.paymentId}</p>
          <p><strong>Amount:</strong> £{r.amount.toFixed(2)}</p>
          <p><strong>Status:</strong> {r.status}</p>
          <p><strong>Time:</strong> {new Date(r.timestamp).toLocaleString()}</p>
        </div>
      ))}

      <button
        className="cta__button"
        style={{ marginTop: 30 }}
        onClick={() => navigate("/merchant/status")}
      >
        Back to Merchant Status
      </button>
    </div>
  );
}
