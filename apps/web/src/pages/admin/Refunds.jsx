/**
 * ============================================================
 *  HoloTap — Refunds & Void Operations (Admin)
 *  File: src/pages/admin/Refunds.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides administrators with tools to process refunds and void
 *  transactions. Includes search, transaction lookup, and action
 *  controls. Restricted to admin role only.
 * ============================================================
 */

export default function Refunds() {
  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Refunds & Voids</h1>
      <p style={styles.subtitle}>
        Search transactions and perform refund or void operations.
      </p>

      {/* ============================
          SEARCH SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Find Transaction</h2>

        <label style={styles.label}>Transaction ID</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter transaction ID (e.g., TX-49302)"
        />

        <button style={styles.button}>Search</button>
      </div>

      {/* ============================
          TRANSACTION DETAILS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Transaction Details</h2>

        <p style={styles.placeholder}>No transaction selected.</p>
      </div>

      {/* ============================
          ACTION BUTTONS SECTION
          ============================ */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Actions</h2>

        <button style={styles.refundButton}>Process Refund</button>
        <button style={styles.voidButton}>Void Transaction</button>
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
    width: "fit-content",
  },

  refundButton: {
    padding: "14px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "fit-content",
  },

  voidButton: {
    padding: "14px",
    backgroundColor: "#c62828",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "fit-content",
  },

  // Placeholder text
  placeholder: {
    color: "#777",
    marginTop: "10px",
  },
};
