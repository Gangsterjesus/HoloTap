/**
 * ============================================================
 *  HoloTap — Authentication: Verification
 *  File: src/pages/auth/VerifyAuth.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Validates the authentication token or credential returned
 *    from magic link or passkey flows.
 *
 *  Responsibilities:
 *    - Call verification endpoint
 *    - Display authentication status
 *    - Persist returning user details for future login optimisation
 * ============================================================
 */

import { useEffect, useState } from "react";
import "./VerifyAuth.css";

export default function VerifyAuth() {
  const [status, setStatus] = useState("Verifying…");

  async function verify() {
    try {
      const res = await fetch("http://192.168.1.205:3001/auth/verify");
      const data = await res.json();

      // Update UI status
      setStatus(data?.message || "Authenticated.");

      // Persist returning user details
      if (data?.authenticated && data?.email) {
        localStorage.setItem(
          "ht_last_user",
          JSON.stringify({
            email: data.email,
            role: data.role || "merchant",
            lastLogin: Date.now(),
          })
        );
      }
    } catch (err) {
      setStatus("Verification failed.");
    }
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="verify-container">
      <h1 className="verify-title">Authentication</h1>
      <p className="verify-status">{status}</p>
    </div>
  );
}
