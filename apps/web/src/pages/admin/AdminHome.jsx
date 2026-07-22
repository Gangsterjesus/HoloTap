/**
 * ============================================================
 *  HoloTap — Admin Home Page
 *  File: src/pages/admin/AdminHome.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  The central hub for HoloTap administrators. Provides access
 *  to system logs, refund operations, live monitoring, and
 *  platform‑wide oversight tools. Restricted to admin role only.
 * ============================================================
 */

export default function AdminHome() {
  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p style={styles.subtitle}>
        System‑level controls and monitoring tools for HoloTap operations.
      </p>

      {/* ============================
          ADMIN SUMMARY SECTION
          ============================ */}
      <div style={styles.summary}>
        <div style={styles.card}>
          <h2>Total Creators</h2>
          <p>0</p>
        </div>

        <div style={styles.card}>
          <h2>Active Badges</h2>
          <p>0</p>
        </div>

        <div style={styles.card}>
          <h2>System Alerts</h2>
          <p>None</p>
        </div>
      </div>

      {/* ============================
          ADMIN ACTIONS SECTION
          ============================ */}
      <div style={styles.actions}>
        <a href="/admin/logs" style={styles.button}>View Logs</a>
        <a href="/admin/refunds" style={styles.button}>Refunds</a>
        <a href="/admin/live" style={styles.button}>Live Monitoring</a>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },

  // Header
  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },

  // Summary cards
  summary: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    textAlign: "center",
  },

  // Actions
  actions: {
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "14px 24px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
