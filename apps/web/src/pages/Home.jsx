/**
 * ============================================================
 *  HoloTap — Public Landing Page
 *  File: Home.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  The public landing page for the HoloTap web application.
 *  Introduces the product, brand, and core value proposition.
 *  This page is visible to all visitors before onboarding.
 * ============================================================
 */

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>HoloTap</h1>
      <p style={styles.tagline}>Scan the hologram. Skip the fraud.</p>

      <div style={styles.section}>
        <p>
          HoloTap is a secure holographic payment badge designed for creators,
          merchants, and private operators. Scan the badge to verify identity,
          initiate payments, and eliminate fraud from your workflow.
        </p>
      </div>

      <div style={styles.actions}>
        <a href="/onboarding" style={styles.button}>Get Started</a>
        <a href="/verify" style={styles.secondary}>Verify a Badge</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "20px",
    color: "#555",
    marginBottom: "30px",
  },
  section: {
    maxWidth: "600px",
    margin: "0 auto 40px auto",
    fontSize: "18px",
    lineHeight: "1.6",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  secondary: {
    padding: "12px 24px",
    backgroundColor: "#eee",
    color: "#111",
    borderRadius: "6px",
    textDecoration: "none",
  },
};
