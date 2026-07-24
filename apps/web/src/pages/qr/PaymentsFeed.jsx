/**
 * File: PaymentsFeed.jsx
 * Project: HoloTap Web UI
 * Screen: Payments Feed
 *
 * Author: Raymond Newton (E5357171)
 * Date: 24 July 2026
 *
 * Description:
 *  - Displays a list of recent merchant payments.
 *  - Fetches payment data from HoloTapServer (/payments/list).
 *  - Allows merchants to inspect individual payment entries.
 *
 * Notes:
 *  - Styling is external (styles/paymentsFeed.css).
 *  - Future enhancement: pagination + real-time updates.
 */

import { useEffect, useState } from "react";
import "../../styles/paymentsFeed.css";

export default function PaymentsFeed() {
  // -----------------------------------
  // State
  // -----------------------------------
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -----------------------------------
  // Fetch Payments
  // -----------------------------------
  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch("http://192.168.1.205:3001/payments/list");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load payments");
        }

        setPayments(data.payments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  // -----------------------------------
  // Render
  // -----------------------------------
  return (
    <div className="pf-wrapper">
      <h1 className="pf-title">Payments Feed</h1>

      {loading && <p className="pf-loading">Loading payments…</p>}
      {error && <p className="pf-error">{error}</p>}

      {!loading && !error && payments.length === 0 && (
        <p className="pf-empty">No payments found.</p>
      )}

      <ul className="pf-list">
        {payments.map((payment) => (
          <li key={payment.id} className="pf-item">
            <div className="pf-row">
              <span className="pf-amount">£{payment.amount}</span>
              <span className="pf-status">{payment.status}</span>
            </div>
            <div className="pf-meta">
              <span>Ref: {payment.reference}</span>
              <span>{payment.timestamp}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
