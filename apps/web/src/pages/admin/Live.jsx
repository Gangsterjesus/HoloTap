/**
 * ============================================================
 *  HoloTap — Live Monitoring Page (Admin)
 *  File: src/pages/admin/Live.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides real‑time monitoring of HoloTap platform activity.
 *  Displays live badge scans, payment attempts, fraud alerts,
 *  and system heartbeat indicators. Restricted to admin role.
 * ============================================================
 */

export default function Live() {
  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Live Monitoring</h1>
      <p style={styles.subtitle}>
        Real‑time activity feed for HoloTap badge scans and payments.
      </p>

      {/* ============================
          SYSTEM HEARTBEAT SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>System Heartbeat</h2>
        <p style={styles.statusText}>Status: Online</p>
        <p style={styles.statusText}>Last Ping: Just now</p>
      </div>

      {/* ============================
          LIVE SCAN FEED SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Live Badge Scans</h2>
        <p style={styles.placeholder}>No scans detected.</p>
      </div>

      {/* ============================
          LIVE PAYMENT FEED SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Live Payments</h2>
        <p style={styles.placeholder}>No payment attempts detected.</p>
      </div>

      {/* ============================
          FRAUD ALERTS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Fraud Alerts</h2>
        <p style={styles.placeholder}>No fraud alerts at this time.</p>
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

  // Section wrapper
  section: {
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },

  // Status text
  statusText: {
    fontSize: "16px",
    color: "#444",
  },

  // Placeholder text
  placeholder: {
    color: "#777",
    marginTop: "10px",
  },
};
