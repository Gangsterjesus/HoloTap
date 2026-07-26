/**
 * ============================================================
 *  HoloTap — Authentication: Login
 *  File: src/pages/auth/Login.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Entry point for user authentication. Allows users to initiate
 *    sign‑in using either a magic link or a passkey credential.
 *
 *  Responsibilities:
 *    - Capture user email input
 *    - Request magic link delivery
 *    - Initiate passkey authentication flow
 *    - Auto‑fill returning user details
 * ============================================================
 */

import { useEffect, useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");

  // ------------------------------------------------------------
  // Load returning user details (email auto‑fill)
  // ------------------------------------------------------------
  useEffect(() => {
    const last = localStorage.getItem("ht_last_user");
    if (last) {
      const user = JSON.parse(last);
      if (user?.email) {
        setEmail(user.email);
      }
    }
  }, []);

  // ------------------------------------------------------------
  // Optional: Auto‑redirect returning users directly to passkey
  // Uncomment if desired
  //
  // useEffect(() => {
  //   const last = localStorage.getItem("ht_last_user");
  //   if (last) {
  //     const user = JSON.parse(last);
  //     if (user?.email) {
  //       navigate("/auth/passkey", { state: { email: user.email } });
  //     }
  //   }
  // }, []);
  // ------------------------------------------------------------

  async function requestMagicLink() {
    await fetch("http://192.168.1.205:3001/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  async function usePasskey() {
    await fetch("http://192.168.1.205:3001/auth/passkey/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Sign In</h1>
      <p className="login-subtitle">Choose magic link or passkey.</p>

      <div className="login-form">
        <label className="login-label">
          Email address
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <div className="login-actions">
          <button className="login-btn-primary" onClick={requestMagicLink}>
            Send Magic Link
          </button>
          <button className="login-btn-secondary" onClick={usePasskey}>
            Use Passkey
          </button>
        </div>
      </div>
    </div>
  );
}
