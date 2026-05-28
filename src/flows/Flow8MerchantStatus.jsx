// src/flows/Flow8MerchantStatus.jsx

import { useEffect, useState } from "react";
import { getSession, touchSession } from "../Utils/Session";
// ...other imports...


export default function Flow8MerchantStatus({ setFlow }) {
  const [lastTx, setLastTx] = useState(null);
  const [status, setStatus] = useState("Awaiting scans...");
useEffect(() => {
  const session = getSession();
  if (!session) {
    alert("Your session has expired. Please log in again.");
    setFlow(2);
    return;
  }

  touchSession();
}, [setFlow]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("ht_logs") || "[]");

    if (logs.length > 0) {
      const tx = logs[logs.length - 1];
      setLastTx(tx);
      setStatus("Active — Last payment processed");
    }
  }, []);

  return (
    <div className="ht-container">
      <h2>Flow 8 — Merchant Status</h2>
      <p>Your merchant verification and last scan details.</p>

      <div className="ht-card" style={{ marginTop: 20 }}>
        <h3>Status</h3>
        <p><strong>{status}</strong></p>
      </div>

      {lastTx && (
        <div className="ht-card" style={{ marginTop: 20 }}>
          <h3>Last Scanned Payment</h3>

          <p><strong>Amount:</strong> £{lastTx.amount}</p>

          {lastTx.description && (
            <p><strong>Description:</strong> {lastTx.description}</p>
          )}

          <p>
            <strong>Processed:</strong>{" "}
            {new Date(lastTx.processedAt).toLocaleString()}
          </p>

          <p><strong>User ID:</strong> {lastTx.userId}</p>
          <p><strong>Session ID:</strong> {lastTx.sessionId}</p>
          <p><strong>Transaction ID:</strong> {lastTx.id}</p>
        </div>
      )}

      {!lastTx && (
        <p style={{ marginTop: 20 }}>No scans yet. Waiting for your first payment.</p>
      )}

      <div style={{ marginTop: 20 }}>
        <button className="cta__button" onClick={() => setFlow(5)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
