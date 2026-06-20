// src/components/MerchantDashboard.jsx

import { useState } from "react";
import { createSession } from "../services/sessionService.js";
import QRCode from "react-qr-code";

export default function MerchantDashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startSession = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await createSession("merchant", "M123");

      if (!response.success) {
        setError("Failed to create session");
        setLoading(false);
        return;
      }

      setSession(response.data);
    } catch (err) {
      setError("Server error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Merchant Dashboard</h2>
      <p>Start a merchant session and display a QR code for consumers to scan.</p>

      {!session && (
        <button className="cta__button" onClick={startSession} disabled={loading}>
          {loading ? "Starting..." : "Start Session"}
        </button>
      )}

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}

      {session && (
        <div style={{ marginTop: 20 }}>
          <h3>Session Active</h3>
          <p><strong>Session ID:</strong> {session.id}</p>

          <div style={{ marginTop: 20, background: "white", padding: 20, display: "inline-block" }}>
            <QRCode value={session.id} size={180} />
          </div>

          <p style={{ marginTop: 10, fontStyle: "italic" }}>
            Consumers scan this QR code to begin payment.
          </p>
        </div>
      )}
    </div>
  );
}
