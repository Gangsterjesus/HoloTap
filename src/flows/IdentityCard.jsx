/**
 * ============================================================
 *  HoloTap — Merchant Identity Card
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays the merchant’s identity information, including the
 *  merchant tag identifier and session metadata. This screen is
 *  part of the administrative merchant workflow and provides a
 *  simple, read‑only identity view.
 *
 *  Architecture Notes:
 *  - Loads merchant session via MerchantSession.js.
 *  - Displays merchant tagID and internal merchantId.
 *  - Contains no business logic beyond identity display.
 *  - Navigation controlled by React Router.
 *
 *  Engineering Notes:
 *  - All imports validated for existence and case‑sensitivity.
 *  - Legacy TM352 session import replaced with MerchantSession.js.
 *  - Fully Vite‑compliant and TM352‑compatible.
 *  - Ready for backend expansion (identity verification, badges).
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMerchantSession as getSession,
  touchMerchantSession as touchSession
} from "../Utils/MerchantSession.js";

export default function IdentityCard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const s = getSession();
    if (s) {
      setSession(s);
      touchSession();
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Merchant Identity Card</h2>

      {!session && (
        <p style={{ marginTop: 10, color: "red" }}>
          No active merchant session found.
        </p>
      )}

      {session && (
        <div
          style={{
            marginTop: 20,
            background: "#222",
            padding: 20,
            borderRadius: 8,
            width: "fit-content"
          }}
        >
          <p><strong>Merchant Tag:</strong> {session.tagID}</p>
          <p><strong>Internal Merchant ID:</strong> {session.merchantId}</p>
          <p><strong>Session Type:</strong> {session.type}</p>
          <p><strong>Created:</strong> {new Date(session.createdAt).toLocaleString()}</p>
          <p><strong>Expires:</strong> {new Date(session.expiresAt).toLocaleString()}</p>
        </div>
      )}

      <button
        className="cta__button"
        style={{ marginTop: 20 }}
        onClick={() => navigate("/merchant/status")}
      >
        Back to Merchant Status
      </button>
    </div>
  );
}
