/**
 * ============================================================
 *  HoloTap — Authentication: Magic Link
 *  File: src/pages/auth/MagicLink.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Confirms that a magic link has been sent to the user’s email
 *    and provides guidance for completing authentication.
 *
 *  Responsibilities:
 *    - Display confirmation message
 *    - Provide fallback instructions
 * ============================================================
 */

import "./MagicLink.css";

export default function MagicLink() {
  return (
    <div className="magic-container">
      <h1 className="magic-title">Magic Link Sent</h1>
      <p className="magic-subtitle">
        Check your email and click the link to complete sign‑in.
      </p>
      <p className="magic-text">
        If you don’t see the email, check your spam folder or try again from
        the login page.
      </p>
    </div>
  );
}
