/**
 * ============================================================
 *  HoloTap — Creator Identity Management Page
 *  File: src/pages/dashboard/Identity.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Allows creators to manage their identity information used for
 *  hologram badge generation. Includes display name, mobile number,
 *  verification status, and QR regeneration controls.
 * ============================================================
 */

export default function Identity() {
  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Identity Settings</h1>
      <p style={styles.subtitle}>
        Manage your creator identity and hologram badge details.
      </p>

      {/* ============================
          PROFILE DETAILS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Profile Information</h2>

        <label style={styles.label}>Display Name</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Your public creator name"
        />

        <label style={styles.label}>Mobile Number</label>
        <input
          style={styles.input}
          type="text"
          placeholder="+44 7000 000000"
        />

        <button style={styles.button}>Save Changes</button>
      </div>

      {/* ============================
          BADGE STATUS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Badge Status</h2>
        <p style={styles.statusText}>Verification: Pending</p>
        <p style={styles.statusText}>Badge ID: HT-00000</p>
      </div>

      {/* ============================
          QR REGENERATION SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Identity QR</h2>
        <p style={styles.statusText}>
          Your identity QR is used to verify your hologram badge.
        </p>

        <button style={styles.buttonSecondary}>
          Regenerate Identity QR
        </button>
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
    gap: "15px",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },

  // Form fields
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  // Buttons
  button: {
    padding: "14px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonSecondary: {
    padding: "14px",
    backgroundColor: "#eee",
    color: "#111",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },

  // Status text
  statusText: {
    fontSize: "16px",
    color: "#444",
  },
};
