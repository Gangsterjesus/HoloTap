/**
 * ============================================================
 *  HoloTap — Consumer Registration Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the consumer with a simple registration interface
 *  before entering the HoloTap ecosystem. This screen collects
 *  the consumer’s display name and transitions them into the
 *  consumer home environment.
 *
 *  Architecture Notes:
 *  - Pure UI component; contains no backend logic yet.
 *  - Designed for future backend expansion:
 *        • Consumer identity creation
 *        • Device fingerprinting
 *        • Fraud‑prevention metadata
 *  - Emits onComplete() to parent router (holo.jsx).
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, minimal, user‑friendly design.
 *  - Explicit validation and error handling.
 *
 * ============================================================
 */

import { useState } from "react";

export default function ConsumerRegistration({ onComplete }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    // Future backend: create consumer identity here
    if (onComplete) {
      onComplete(name.trim());
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Consumer Registration</h2>

      <p style={{ marginTop: 10 }}>
        Enter your name to begin using HoloTap.
      </p>

      <div style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: 10,
            width: "240px",
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
        onClick={register}
      >
        Continue
      </button>
    </div>
  );
}
