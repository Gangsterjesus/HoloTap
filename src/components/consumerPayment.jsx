// src/components/ConsumerPayment.jsx

import { useState } from "react";
import { createPayment } from "../services/paymentApiService.js";

export default function ConsumerPayment({ sessionId, onProcessing }) {
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

      // Pass payment ID back to parent (Holo or router)
      onProcessing(response.data.paymentId);

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
