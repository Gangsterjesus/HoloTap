/**
 * ============================================================
 *  HoloTap — Consumer Login Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the consumer login interface for entering a mobile
 *  number and creating a session. This screen is the entry point
 *  for authenticated consumer activity within the HoloTap system.
 *
 *  Architecture Notes:
 *  - Uses ConsumerSession.js for session creation and storage.
 *  - Uses CountrySelector.jsx for international dial code input.
 *  - Emits onLogin() to parent router (holo.jsx) after success.
 *  - Designed for future backend expansion:
 *        • OTP verification
 *        • Fraud‑prevention metadata
 *        • Device fingerprinting
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean validation and error handling.
 *  - Explicit, maintainable state transitions.
 *
 * ============================================================
 */

import { useState } from "react";
import CountrySelector from "../components/CountrySelector.jsx";
import {
  createConsumerSession,
  clearConsumerSession
} from "../Utils/ConsumerSession.js";
import { getConsumerByMobile } from "../services/ConsumerServices.js";


export default function ConsumerLogin({ onLogin }) {
  const [dialCode, setDialCode] = useState("+44");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!mobile.trim()) {
      setError("Please enter your mobile number");
      return;
    }

    const fullMobile = `${dialCode}${mobile.trim()}`;

    const consumer = getConsumerByMobile(fullMobile);

    if (!consumer) {
      setError("No account found for this number");
      return;
    }

    clearConsumerSession();
    createConsumerSession(consumer);

    if (onLogin) {
      onLogin(consumer);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Consumer Login</h2>

      <p style={{ marginTop: 10 }}>
        Enter your mobile number to access your HoloTap account.
      </p>

      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <CountrySelector value={dialCode} onChange={setDialCode} />

        <input
          type="tel"
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{
            padding: 10,
            width: "180px",
            fontSize: "1.1rem",
            borderRadius: 6
          }}
        />
      </div>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}

      <button
        className="cta__button"
        style={{ marginTop: 20 }}
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
}

