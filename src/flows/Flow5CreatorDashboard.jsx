// src/flows/Flow5CreatorDashboard.jsx

import { useEffect, useState } from "react";
import { getSession, touchSession } from "../Utils/Session";

export default function Flow5CreatorDashboard({ setFlow }) {
  const [logs, setLogs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lastPayment, setLastPayment] = useState(null);

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

    if (storedLogs.length > 0) {
      const revenue = storedLogs.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      setTotalRevenue(revenue);
      setLastPayment(storedLogs[storedLogs.length - 1]);
    }
  }, []);

  return (
    <div className="ht-container">
      <h2>Flow 5 — Creator Dashboard</h2>
      <p>Welcome back, Creator. Here are your latest stats.</p>

      <div className="ht-card" style={{ marginTop: 20 }}>
        <h3>Overview</h3>

        <p><strong>Total Payments:</strong> {logs.length}</p>

        {/* ⭐ Currency formatting applied */}
        <p><strong>Total Revenue:</strong> £{Number(totalRevenue).toFixed(2)}</p>

        {lastPayment && (
          <>
            <h4 style={{ marginTop: 15 }}>Last Payment</h4>

            {/* ⭐ Currency formatting applied */}
            <p><strong>Amount:</strong> £{Number(lastPayment.amount).toFixed(2)}</p>

            {lastPayment.description && (
              <p><strong>Description:</strong> {lastPayment.description}</p>
            )}

            <p>
              <strong>Processed:</strong>{" "}
              {new Date(lastPayment.processedAt).toLocaleString()}
            </p>
          </>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="cta__button" onClick={() => setFlow(3)}>
          Make a New Payment
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow(9)}
          style={{ marginLeft: 10 }}
        >
          View Logs (Flow 9)
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow(6)}
          style={{ marginLeft: 10 }}
        >
          Identity Card (Flow 6)
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow(8)}
          style={{ marginLeft: 10 }}
        >
          Merchant Status (Flow 8)
        </button>
      </div>
    </div>
  );
}
