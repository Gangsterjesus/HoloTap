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
 *    Public verification page for scanning and validating HoloTap
 *    holographic badges. Used by customers, clients, and operators
 *    to confirm authenticity before initiating a payment or identity
 *    check.
 *
 *  Subsystem:
 *    Flow 6P — Public Verification → Badge Authenticity
 *
 *  Notes:
 *    - Inline styles removed
 *    - Uses external CSS (verify.css)
 * ============================================================
 */

import "../styles/verify.css";

export default function Verify() {
  return (
    <div className="verify-container">
      <h1 className="verify-title">Verify a HoloTap Badge</h1>
      <p className="verify-subtitle">
        Enter the badge code or scan the hologram to confirm authenticity.
      </p>

      {/* BADGE CODE INPUT */}
      <div className="verify-section">
        <label className="verify-label">Badge Code</label>
        <input
          className="verify-input"
          type="text"
          placeholder="Enter badge code (e.g., HT-49302)"
        />

        <button className="verify-button">Verify Badge</button>
      </div>

      {/* SCAN OPTION */}
      <div className="verify-scan-section">
        <h2 className="verify-scan-title">Scan Instead</h2>
        <p className="verify-scan-text">
          Use your mobile device to scan the hologram and verify instantly.
        </p>

        <a href="/scan" className="verify-scan-button">
          Open Scanner
        </a>
      </div>
    </div>
  );
}
