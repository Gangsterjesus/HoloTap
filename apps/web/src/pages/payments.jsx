/**
 * ============================================================
 *  HoloTap — Payments Overview (Flow 5)
 *  File: src/pages/payments.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 25 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays the creator’s payment history, including amounts,
 *  timestamps, session linkage, and payment status.
 *
 *  Subsystem:
 *  Flow 5 — Payments → Session-linked payment history
 *
 *  Notes:
 *  - Uses external CSS (payments.css)
 *  - Fetches payment data from backend API
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../services/api";   // adjust if needed
import "../styles/payments.css";

export default function Payments() {
  const navigate = useNavigate();

  // ============================
  // STATE MANAGEMENT
  // ============================
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ============================
  // FETCH PAYMENTS (FLOW 5 CORE)
  // ============================
  useEffect(() => {
    async function loadPayments() {
      try {
        const res = await getPayments();
        setPayments(res.payments || []);
      } catch (err) {
        console.error("Payments fetch error:", err);
        setError("Unable to load payments.");
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  // ============================
  // RENDER
  // ============================
  return (
    <div className="payments-container">

      {/* HEADER */}
      <h1 className="payments-title">Payments</h1>
      <p className="payments-subtitle">Your hologram badge payment history.</p>

      {/* ERROR */}
      {error && <p className="payments-error">{error}</p>}

      {/* LOADING */}
      {loading && <p className="payments-loading">Loading payments…</p>}

      {/* PAYMENT LIST */}
      {!loading && payments.length === 0 && (
        <p className="payments-empty">No payments recorded yet.</p>
      )}

      {!loading && payments.length > 0 && (
        <div className="payments-list">
          {payments.map((p) => (
            <div key={p.id} className="payments-card">
              <h2>£{p.amount.toFixed(2)}</h2>
              <p>Status: {p.status}</p>
              <p>Session: {p.sessionId}</p>
              <p>Date: {new Date(p.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* ACTIONS */}
      <div className="payments-actions">
        <button
          className="payments-button"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
