/**
 * ============================================================
 *  HoloTap — Merchant Status Dashboard
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the merchant with a central status screen after a
 *  session has been created. Displays merchant identity and
 *  session metadata, and provides navigation to operational
 *  merchant tools.
 *
 *  Architecture Notes:
 *  - Loads merchant session via MerchantSession.js.
 *  - Displays merchant tagID, merchantId, and session metadata.
 *  - Contains no business logic beyond identity display.
 *  - Navigation controlled by React Router.
 *
 *  Engineering Notes:
 *  - All imports validated for existence and case‑sensitivity.
 *  - Legacy TM352 session import replaced with MerchantSession.js.
 *  - Fully Vite‑compliant and production‑ready.
 *  - Ready for backend expansion (session polling, analytics).
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMerchantSession as getSession,
  touchMerchantSession as touchSession
} from "../utils/MerchantSession.js";

export default function MerchantStatus() {
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
      <h2>Merchant Status</h2>

      {!session && (
        <p style={{ marginTop: 10, color: "red" }}>
          No active merchant session found.
        </p>
      )}

      {session && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Merchant Tag:</strong> {session.tagID}</p>
          <p><strong>Session ID:</strong> {session.merchantId}</p>
          <p><strong>Session Type:</strong> {session.type}</p>
          <p><strong>Created:</strong> {new Date(session.createdAt).toLocaleString()}</p>
          <p><strong>Expires:</strong> {new Date(session.expiresAt).toLocaleString()}</p>
        </div>
      )}

      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        <button className="cta__button" onClick={() => navigate("/live")}>
          View Live Payments
        </button>

        <button className="cta__button" onClick={() => navigate("/refund")}>
          Refund / Void Payments
        </button>

        <button className="cta__button" onClick={() => navigate("/identity")}>
          Merchant Identity Card
        </button>

        <button className="cta__button" onClick={() => navigate("/merchant")}>
          Start New Session
        </button>
      </div>
    </div>
  );
}
