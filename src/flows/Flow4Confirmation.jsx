// src/flows/Flow4Confirmation.jsx

import { useEffect, useState } from "react";

export default function Flow4Confirmation({ setFlow }) {
  const [tx, setTx] = useState(null);

  useEffect(() => {
    // Load logs
    const logs = JSON.parse(localStorage.getItem("ht_logs") || "[]");

    // Get the last processed transaction
    if (logs.length > 0) {
      setTx(logs[logs.length - 1]);
    }
  }, []);

  if (!tx) {
    return (
      <div className="ht-container">
        <h2>Flow 4 — Payment Confirmation</h2>
        <p>No transaction found.</p>
        <button className="cta__button" onClick={() => setFlow(3)}>
          Back to Payment
        </button>
      </div>
    );
  }

  return (
    <div className="ht-container">
      <h2>Flow 4 — Payment Confirmation</h2>
      <p>Your payment was processed successfully.</p>

      <div className="ht-card" style={{ marginTop: 20 }}>
        <h3>Transaction Details</h3>

        <p><strong>Transaction ID:</strong> {tx.id}</p>
        <p><strong>Amount:</strong> £{tx.amount}</p>
        {tx.description && <p><strong>Description:</strong> {tx.description}</p>}
        <p><strong>Processed:</strong> {new Date(tx.processedAt).toLocaleString()}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="cta__button" onClick={() => setFlow(3)}>
          Make Another Payment
        </button>

        <button className="cta__button" onClick={() => setFlow(5)} style={{ marginLeft: 10 }}>
          Go to Creator Dashboard
        </button>
      </div>
    </div>
  );
}
