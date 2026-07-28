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
 *    Public landing page for HoloTap.
 *    Introduces product, brand, and core value proposition.
 *    Routes into Flow 6 (Scan) and Flow 7 (Status).
 * ============================================================
 */

import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">HoloTap</h1>
      <p className="home-tagline">Scan the hologram. Skip the fraud.</p>

      <div className="home-section">
        <p className="home-description">
          HoloTap is a secure holographic payment badge designed for creators,
          merchants, and private operators. Scan the badge to verify identity,
          initiate payments, and eliminate fraud from your workflow.
        </p>
      </div>

      <div className="home-features">
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

      <div className="home-actions">
        {/* Flow 6 — QR Scan */}
        <a href="/scan" className="btn-primary">Scan a Badge</a>

        {/* Flow 7 — Session Status */}
        <a href="/status" className="btn-secondary">Check Status</a>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card" tabIndex={0}>
      <span className="feature-icon">{icon}</span>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{text}</p>
    </div>
  );
}
