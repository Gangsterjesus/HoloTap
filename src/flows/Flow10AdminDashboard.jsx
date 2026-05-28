// src/flows/Flow10AdminDashboard.jsx

import { useEffect, useState } from "react";
import { getUser } from "../services/UserService";

export default function Flow10AdminDashboard({ setFlow }) {
  const [creator, setCreator] = useState(null);
  const [logs, setLogs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const u = getUser();
    setCreator(u);

    const storedLogs = JSON.parse(localStorage.getItem("ht_logs") || "[]");
    setLogs(storedLogs);

    if (storedLogs.length > 0) {
      const revenue = storedLogs.reduce((sum, tx) => sum + tx.amount, 0);
      setTotalRevenue(revenue);
    }
  }, []);

  const handleResetSystem = () => {
    if (window.confirm("Are you sure? This will wipe ALL logs and tokens.")) {
      localStorage.removeItem("ht_logs");
      localStorage.removeItem("ht_last_qr_token");
      setLogs([]);
      setTotalRevenue(0);
      alert("System reset complete.");
    }
  };

  return (
    <div className="ht-container">
      <h2>Flow 10 — Admin Dashboard</h2>
      <p>System‑level controls and analytics.</p>

      <div className="ht-card" style={{ marginTop: 20 }}>
        <h3>System Summary</h3>
        <p><strong>Total Transactions:</strong> {logs.length}</p>
        <p><strong>Total Revenue:</strong> £{totalRevenue.toFixed(2)}</p>
      </div>

      {creator && (
        <div className="ht-card" style={{ marginTop: 20 }}>
          <h3>Registered Creator</h3>
          <p><strong>Name:</strong> {creator.name}</p>
          <p><strong>User ID:</strong> {creator.userId}</p>
          <p><strong>Mobile:</strong> {creator.mobile}</p>
        </div>
      )}

      <div className="ht-card" style={{ marginTop: 20 }}>
        <h3>All Transactions</h3>

        {logs.length === 0 && <p>No transactions found.</p>}

        {logs.map((tx) => (
          <div
            key={tx.id}
            className="ht-card"
            style={{ marginBottom: 15, padding: 15 }}
          >
            <h4>Transaction ID: {tx.id}</h4>
            <p><strong>Amount:</strong> £{tx.amount}</p>
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

        <button
          className="cta__button"
          style={{ marginLeft: 10, backgroundColor: "#b30000" }}
          onClick={handleResetSystem}
        >
          Reset System
        </button>
      </div>
    </div>
  );
}
