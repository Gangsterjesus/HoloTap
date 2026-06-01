// src/flows/Flow9Logging.jsx

import { useEffect, useState } from "react";
import { getSession, touchSession } from "../Utils/Session";

export default function Flow9Logging({ setFlow }) {
  const [logs, setLogs] = useState([]);

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
    const storedLogs = JSON.parse(localStorage.getItem("ht_logs") || "[]");
    setLogs(storedLogs);
  }, []);

  return (
    <div className="ht-container">
      <h2>Flow 9 — Transaction Logs</h2>
      <p>All processed payments are listed below.</p>

      {logs.length === 0 && <p>No transactions found.</p>}

      {logs.length > 0 && (
        <div className="ht-card" style={{ marginTop: 20 }}>
          <h3>Summary</h3>

          <p><strong>Total Transactions:</strong> {logs.length}</p>

          {/* ⭐ Currency formatting applied */}
          <p>
            <strong>Total Revenue:</strong> £
            {Number(
              logs.reduce((sum, tx) => sum + tx.amount, 0)
            ).toFixed(2)}
          </p>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {logs.map((tx) => (
          <div
            key={tx.id}
            className="ht-card"
            style={{ marginBottom: 15, padding: 15 }}
          >
            <h4>Transaction ID: {tx.id}</h4>

            {/* ⭐ Currency formatting applied */}
            <p><strong>Amount:</strong> £{Number(tx.amount).toFixed(2)}</p>

            {tx.description && (
              <p><strong>Description:</strong> {tx.description}</p>
            )}

            <p>
              <strong>Processed:</strong>{" "}
              {new Date(tx.processedAt).toLocaleString()}
            </p>

            <p><strong>User ID:</strong> {tx.userId}</p>
            <p><strong>Session ID:</strong> {tx.sessionId}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="cta__button" onClick={() => setFlow(5)}>
          Back to Creator Dashboard
        </button>
      </div>
    </div>
  );
}
