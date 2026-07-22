/**
 * ============================================================
 *  HoloTap — Creator Onboarding Page
 *  File: src/pages/Onboarding.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  The onboarding flow for new creators joining HoloTap.
 *  Collects basic profile information before identity verification.
 *  This page is part of the public access layer of the web app.
 * ============================================================
 */

export default function Onboarding() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Creator Onboarding</h1>
      <p style={styles.subtitle}>
        Start your HoloTap creator profile. This takes less than 2 minutes.
      </p>

      <form style={styles.form}>
        <label style={styles.label}>Display Name</label>
        <input style={styles.input} type="text" placeholder="Your public name" />

        <label style={styles.label}>Email Address</label>
        <input style={styles.input} type="email" placeholder="you@example.com" />

        <label style={styles.label}>Creator Type</label>
        <select style={styles.input}>
          <option>Content Creator</option>
          <option>Merchant</option>
          <option>Performer</option>
          <option>Private Operator</option>
        </select>

        <button style={styles.button}>Continue</button>
      </form>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
    marginTop: "10px",
  },
};
