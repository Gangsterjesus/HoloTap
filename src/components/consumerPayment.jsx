/**
 * ============================================================
 *  HoloTap — Consumer Payment Entry (Backend Payment Creation)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the consumer‑side interface for entering a payment
 *  amount and initiating a backend payment request. This screen
 *  is displayed after the consumer scans the merchant’s QR code
 *  and receives a valid merchant session identifier.
 *
 *  Architecture Notes:
 *  - Calls backend payment endpoint via paymentApiService.js.
 *  - Redirects to /processing/:paymentId after successful creation.
 *  - Validates numeric input before backend submission.
 *  - Displays loading, error, and transition states.
 *
 *  Engineering Notes:
 *  - All imports validated for existence and case‑sensitivity.
 *  - No business logic beyond payment creation.
 *  - Designed for backend expansion (e.g., currency selection).
 *  - Fully TM352‑compatible and Vite‑compliant.
 *
 * ============================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPayment } from "../services/paymentApiService.js";

export default function ConsumerPayment({ sessionId }) {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPayment = async () => {
    setError("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const response = await createPayment(sessionId, Number(amount));

      if (!response.success) {
        setError("Payment failed to start");
        setLoading(false);
        return;
      }

      const paymentId = response.data.paymentId;

      // Redirect to processing screen
      navigate(`/processing/${paymentId}`, { replace: true });

    } catch (err) {
      setError("Server error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter Payment Amount</h2>
      <p>Session ID: {sessionId}</p>

      <div style={{ marginTop: 20 }}>
        <input
          type="number"
          placeholder="Amount (£)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: 10,
            width: "200px",
            fontSize: "1.1rem",
            borderRadius: 6
          }}
        />
      </div>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}

      <button
        className="cta__button"
        onClick={submitPayment}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
