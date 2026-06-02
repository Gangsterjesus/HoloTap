/**
 * ============================================================
 *  HoloTap — Admin Dashboard (System Control Panel)
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides system‑level analytics, merchant information, and
 *  administrative controls for the HoloTap merchant device.
 *  This includes:
 *    - Viewing all ledger transactions
 *    - Calculating total revenue
 *    - Displaying registered merchant identity
 *    - Performing a full system reset (logs + tokens)
 *
 *  Flow Context:
 *  - Replaces the academic “Flow 10 — Admin Dashboard”
 *  - Accessible only after a valid merchant session is restored
 *  - Part of the merchant‑side operational toolkit
 *
 *  Security Notes:
 *  - Session is validated on mount via getSession() + touchSession()
 *  - Ledger is read from `ht_logs` (append‑only transaction history)
 *  - System reset wipes:
 *        • ht_logs
 *        • ht_last_qr_token
 *    but does NOT remove merchant identity or sessions
 *
 *  Data Model:
 *  Ledger Entry:
 *  {
 *    id: string,
 *    amount: number,
 *    description?: string,
 *    processedAt: number,
 *    userId: string,
 *    sessionId: string
 *  }
 *
 *  Dependencies:
 *  - UserService.getUser()          → loads merchant profile
 *  - Session.getSession()           → session gate
 *  - Session.touchSession()         → extend session TTL
 *  - formatCurrency()               → currency formatting helper
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { getUser } from "../services/UserService";
import { getSession, touchSession } from "../Utils/Session";
import { formatCurrency } from "../Utils/format";

export default function Flow10AdminDashboard({ setFlow }) {
  const [merchant, setMerchant] = useState(null);
  const [logs, setLogs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Session gate
  useEffect(() => {
    const session = getSession();
    if (!session) {
      alert("Your session has expired. Please log in again.");
      setFlow(2);
      return;
    }
    touchSession();
  }, [setFlow]);

  // Load merchant + logs + revenue
  useEffect(() => {
    const u = getUser();
    setMerchant(u);

    const storedLogs = JSON.parse(localStorage.getItem("ht_logs") || "[]");
    setLogs(storedLogs);

    if (storedLogs.length > 0) {
      const revenue = storedLogs.reduce((sum, tx) => sum + tx.amount, 0);
      setTotalRevenue(revenue);
    }
  }, []);

  // System reset
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
    <div className="flow10__container">
      <h2 className="flow10__title">Admin Dashboard</h2>
      <p className="flow10__subtitle">System‑level controls and analytics.</p>

      {/* System Summary */}
      <div className="flow10__card">
        <h3>System Summary</h3>
        <p><strong>Total Transactions:</strong> {logs.length}</p>
        <p><strong>Total Revenue:</strong> {formatCurrency(totalRevenue)}</p>
      </div>

      {/* Merchant Info */}
      {merchant && (
        <div className="flow10__card">
          <h3>Registered Merchant</h3>
          <p><strong>Name:</strong> {merchant.name}</p>
          <p><strong>User ID:</strong> {merchant.userId}</p>
          <p><strong>Mobile:</strong> {merchant.mobile}</p>
        </div>
      )}

      {/* All Transactions */}
      <div className="flow10__card">
        <h3>All Transactions</h3>

        {logs.length === 0 && <p>No transactions found.</p>}

        {logs.map((tx) => (
          <div key={tx.id} className="flow10__tx">
            <h4>Transaction ID: {tx.id}</h4>

            <p><strong>Amount:</strong> {formatCurrency(tx.amount)}</p>

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

      {/* Controls */}
      <div className="flow10__controls">
        <button className="cta__button" onClick={() => setFlow(5)}>
          Back to Merchant Dashboard
        </button>

        <button
          className="cta__button flow10__reset"
          onClick={handleResetSystem}
        >
          Reset System
        </button>
      </div>
    </div>
  );
}
