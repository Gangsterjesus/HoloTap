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
        <p style={styles.description}>
          HoloTap is a secure holographic payment badge designed for creators,
          merchants, and private operators. Scan the badge to verify identity,
          initiate payments, and eliminate fraud from your workflow.
        </p>
      </div>

      {/* ============================
          FEATURE CARDS (Cute + Accessible)
          ============================ */}
      <div style={styles.features}>
        <FeatureCard
          icon="🔒"
          title="Secure Identity"
          text="Every badge is cryptographically linked to a verified creator or merchant."
        />
        <FeatureCard
          icon="💳"
          title="Instant Payments"
          text="Scan the hologram to initiate fast, fraud‑proof payments."
        />
        <FeatureCard
          icon="✨"
          title="Creator‑First"
          text="Built for modern creators who need trust, speed, and simplicity."
        />
      </div>

      {/* ============================
          ACTION BUTTONS
          ============================ */}
      <div style={styles.actions}>
        <a href="/onboarding" style={styles.buttonPrimary}>Get Started</a>
        <a href="/verify" style={styles.buttonSecondary}>Verify a Badge</a>
      </div>
    </div>
  );
}

/* ============================
   FEATURE CARD COMPONENT
   ============================ */
function FeatureCard({ icon, title, text }) {
  return (
    <div style={styles.card} tabIndex={0}>
      <span style={styles.cardIcon}>{icon}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardText}>{text}</p>
    </div>
  );
}

/* ============================
   STYLES (Accessible + Colour‑Blind Safe)
   ============================ */
const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
  },

  title: {
    fontSize: "52px",
    marginBottom: "10px",
    color: "#111",
  },

  tagline: {
    fontSize: "22px",
    color: "#333",
    marginBottom: "30px",
  },

  section: {
    maxWidth: "650px",
    margin: "0 auto 40px auto",
  },

  description: {
    fontSize: "20px",
    lineHeight: "1.7",
    color: "#222",
  },

  /* Feature Cards */
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "26px",
    margin: "40px 0",
  },

  card: {
    padding: "26px",
    borderRadius: "16px",
    backgroundColor: "#F7F7F7",
    border: "2px solid #D0D0D0",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
    outline: "2px solid transparent",
    transition: "transform 0.15s ease, outline 0.15s ease",
  },

  cardIcon: {
    fontSize: "40px",
    marginBottom: "12px",
  },

  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "10px",
  },

  cardText: {
    fontSize: "18px",
    color: "#111",
    lineHeight: "1.6",
  },

  /* Buttons */
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
  },

  buttonPrimary: {
    padding: "14px 28px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "18px",
  },

  buttonSecondary: {
    padding: "14px 28px",
    backgroundColor: "#EAEAEA",
    color: "#111",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "18px",
  },
};
