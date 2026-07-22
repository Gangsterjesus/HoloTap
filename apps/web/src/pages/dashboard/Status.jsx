/**
 * ============================================================
 *  HoloTap — Badge Status Page
 *  File: src/pages/dashboard/Status.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays the current operational status of the creator’s
 *  hologram badge. Shows verification state, scan activity,
 *  fraud alerts, and badge health indicators.
 * ============================================================
 */

export default function Status() {
  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Badge Status</h1>
      <p style={styles.subtitle}>
        Live status and health information for your HoloTap badge.
      </p>

      {/* ============================
          VERIFICATION STATUS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Verification</h2>
        <p style={styles.statusText}>Current State: Pending</p>
        <p style={styles.statusText}>Last Updated: —</p>
      </div>

      {/* ============================
          SCAN ACTIVITY SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Scan Activity</h2>
        <p style={styles.statusText}>Total Scans: 0</p>
        <p style={styles.statusText}>Recent Scan: None</p>
      </div>

      {/* ============================
          FRAUD ALERTS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Fraud Alerts</h2>
        <p style={styles.statusText}>No alerts detected.</p>
      </div>

      {/* ============================
          BADGE HEALTH SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Badge Health</h2>
        <p style={styles.statusText}>Status: OK</p>
        <p style={styles.statusText}>QR Integrity: Normal</p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
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
};
