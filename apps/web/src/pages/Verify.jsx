/**
 * ============================================================
 *  HoloTap — Badge Verification Page
 *  File: src/pages/Verify.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Public verification page for scanning and validating HoloTap
 *  holographic badges. This page is used by customers, clients,
 *  and operators to confirm authenticity before initiating a
 *  payment or identity check.
 * ============================================================
 */

export default function Verify() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Verify a HoloTap Badge</h1>
      <p style={styles.subtitle}>
        Enter the badge code or scan the hologram to confirm authenticity.
      </p>

      <div style={styles.section}>
        <label style={styles.label}>Badge Code</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter badge code (e.g., HT-49302)"
        />

        <button style={styles.button}>Verify Badge</button>
      </div>

      <div style={styles.scanSection}>
        <h2 style={styles.scanTitle}>Scan Instead</h2>
        <p style={styles.scanText}>
          Use your mobile device to scan the hologram and verify instantly.
        </p>

        <a href="#" style={styles.scanButton}>Open Scanner</a>
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
  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "40px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "14px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  scanSection: {
    textAlign: "center",
    marginTop: "20px",
  },
  scanTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  scanText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  scanButton: {
    padding: "12px 24px",
    backgroundColor: "#eee",
    color: "#111",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
