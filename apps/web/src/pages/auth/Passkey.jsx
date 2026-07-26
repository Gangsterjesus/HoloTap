/**
 * ============================================================
 *  HoloTap — Authentication: Passkey
 *  File: src/pages/auth/Passkey.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Initiates passkey authentication using device‑bound credentials
 *    or hardware security keys.
 *
 *  Responsibilities:
 *    - Inform user of browser‑level passkey prompt
 *    - Provide guidance for completing passkey authentication
 * ============================================================
 */

import "./Passkey.css";

export default function Passkey() {
  return (
    <div className="passkey-container">
      <h1 className="passkey-title">Use Passkey</h1>
      <p className="passkey-subtitle">
        Your browser will prompt you to use a saved passkey.
      </p>
      <p className="passkey-text">
        Follow the browser instructions to complete sign‑in using your device
        credential or security key.
      </p>
    </div>
  );
}
