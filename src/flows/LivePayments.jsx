/**
 * HoloTap — Flow 7B: Merchant Live Payments
 * Author: Raymond Newton
 * Date: 01 June 2026
 *
 * Purpose:
 * Displays real‑time incoming payments for the merchant.
 */

import { useEffect, useState } from "react";
import { getSession, touchSession } from "../Utils/Session";
import { getUser } from "../services/UserService";
import { fetchMerchantPayments } from "../services/paymentService";

export default function Flow7LivePayments({ setFlow }) {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);

  // Session gate
  useEffect(() => {
    const session = getSession();
    if (!session) {
      alert("Your session has expired. Please log in again.");
      setFlow(2); // Back to login
      return;
    }
    touchSession();
  }, [setFlow]);

  // Load merchant + fetch payments
  useEffect(() => {
    const u = getUser();
    setUser(u);

    if (u) {
      fetchMerchantPayments(u.userId).then((data) => {
        setPayments(data || []);
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="flow7__container">
        <h2 className="flow7__title">Flow 7 — Live Payments</h2>
        <p>No merchant profile found.</p>

        <button className="cta__button" onClick={() => setFlow(1)}>
          Go to Registration
        </button>
      </div>
    );
  }

  return (
    <div className="flow7__container">
      <h2 className="flow7__title">Flow 7 — Live Payments</h2>
      <p className="flow7__subtitle">Real‑time incoming payments.</p>

      <div className="flow7__list">
        {payments.length === 0 && (
          <p className="flow7__empty">
            No payments yet. Your QR code is ready to scan.
          </p>
        )}

        {payments.map((p) => (
          <div key={p.transactionId} className="flow7__item">
            <div className="flow7__row">
              <span className="flow7__amount">£{p.amount.toFixed(2)}</span>
              <span className={`flow7__status flow7__status--${p.status.toLowerCase()}`}>
                {p.status}
              </span>
            </div>

            <div className="flow7__details">
              <p><strong>Consumer:</strong> {p.consumerName || "Anonymous"}</p>
              <p><strong>Time:</strong> {new Date(p.timestamp).toLocaleString()}</p>
              <p><strong>ID:</strong> {p.transactionId}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="cta__button flow7__back"
        onClick={() => setFlow(5)} // Back to Merchant Dashboard
      >
        Back to Dashboard
      </button>
    </div>
  );
}

