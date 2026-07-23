/**
 * ============================================================
 *  HoloTap — Admin Dashboard
 *  File: src/pages/admin/AdminDashboard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Provides administrators with a consolidated overview of
 *    platform activity, operational health, and system metrics.
 *
 *  Responsibilities:
 *    - Display key performance indicators
 *    - Surface operational status indicators
 *    - Act as the entry point for admin‑level tools
 * ============================================================
 */

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  async function loadStats() {
    try {
      const res = await fetch("http://192.168.1.205:3001/admin/dashboard");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setStats({ error: "Unable to load dashboard metrics." });
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p style={styles.subtitle}>
        System overview and operational metrics for administrators.
      </p>

      {/* ============================
          GRID SECTION
          ============================ */}
      <div style={styles.grid}>
        <DashboardCard label="Live Payments" value={stats?.livePayments} />
        <DashboardCard label="Pending Refunds" value={stats?.pendingRefunds} />
        <DashboardCard label="System Status" value={stats?.systemStatus} />
        <DashboardCard label="Audit Logs" value={stats?.auditLogs} />
        <DashboardCard label="Merchants" value={stats?.merchants} />
        <DashboardCard label="Error Rate" value={stats?.errorRate} />
      </div>

    </div>
  );
}

/* ============================
   ACCESSIBLE + CUTE DASHBOARD CARD
   ============================ */
function DashboardCard({ label, value }) {
  const icon = {
    "Live Payments": "💳",
    "Pending Refunds": "↩️",
    "System Status": "⚙️",
    "Audit Logs": "📜",
    "Merchants": "🏪",
    "Error Rate": "❗",
  }[label] || "✨";

  return (
    <div
      style={styles.cardAccessible}
      tabIndex={0} // keyboard accessible
    >
      <span style={styles.icon}>{icon}</span>
      <h3 style={styles.cardLabelAccessible}>{label}</h3>
      <p style={styles.cardValueAccessible}>{value ?? "—"}</p>
    </div>
  );
}

/* ============================
   STYLES (ACCESSIBLE + COLOUR SAFE)
   ============================ */
const styles = {
  container: {
    padding: "40px",
  },

  // Header
  title: {
    fontSize: "38px",
    marginBottom: "10px",
    color: "#111",
  },
  subtitle: {
    fontSize: "19px",
    color: "#333",
    marginBottom: "30px",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "26px",
    marginTop: "20px",
  },

  // Accessible Card
  cardAccessible: {
    padding: "26px",
    borderRadius: "16px",
    backgroundColor: "#F7F7F7",
    border: "2px solid #D0D0D0",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
    transition: "transform 0.15s ease, outline 0.15s ease",
    outline: "2px solid transparent",
  },

  icon: {
    fontSize: "34px",
    marginBottom: "12px",
  },

  cardLabelAccessible: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "8px",
  },

  cardValueAccessible: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111",
  },
};
