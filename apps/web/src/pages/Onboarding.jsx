/**
 * ============================================================
 *  HoloTap — Creator Onboarding Page
 *  File: src/pages/Onboarding.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 26 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    The onboarding flow for new creators joining HoloTap.
 *    Collects basic profile information before identity verification.
 *
 *  Subsystem:
 *    Public Web — Creator Onboarding
 *
 *  Notes:
 *    - Inline styles removed
 *    - Uses external CSS (onboarding.css)
 * ============================================================
 */

import "../styles/onboarding.css";

/* ============================
   PAGE
   ============================ */

export default function Onboarding() {
  return (
    <div className="onboarding-container">
      <h1 className="onboarding-title">Creator Onboarding</h1>

      <p className="onboarding-subtitle">
        Start your HoloTap creator profile. This takes less than 2 minutes.
      </p>

      <form className="onboarding-form">
        <label className="onboarding-label">Display Name</label>
        <input
          className="onboarding-input"
          type="text"
          placeholder="Your public name"
        />

        <label className="onboarding-label">Email Address</label>
        <input
          className="onboarding-input"
          type="email"
          placeholder="you@example.com"
        />

        <label className="onboarding-label">Creator Type</label>
        <select className="onboarding-input">
          <option>Content Creator</option>
          <option>Merchant</option>
          <option>Performer</option>
          <option>Private Operator</option>
        </select>

        <button className="onboarding-button">Continue</button>
      </form>
    </div>
  );
}
