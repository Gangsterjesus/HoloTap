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
 *  session has been created. This dashboard acts as the hub for
 *  backend‑ready merchant operations including live payments,
 *  payment confirmation, refund/void tools, and identity access.
 *
 *  Architecture Notes:
 *  - Loads merchant session via MerchantSession.js.
 *  - Displays merchant identity and session metadata.
 *  - Provides navigation to:
 *        • LivePayments.jsx
 *        • MerchantConfirm.jsx
 *        • RefundVoid.jsx
 *        • IdentityCard.jsx
 *  - Contains no business logic beyond session display.
 *
 *  Engineering Notes:
 *  - All imports validated for existence and case‑sensitivity.
 *  - Legacy TM352 session import replaced with MerchantSession.js.
 *  - Fully Vite‑compliant and TM352‑compatible.
 *  - Ready for backend expansion (session polling, analytics).
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import {
  getMerchantSession as getSession,
  touchMerchantSession as touchSession
} from "../Utils/MerchantSession.js";

export default function MerchantStatus({ setFlow }) {
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
        <div style={{ marginTop: 10 }}>
          <p><strong>Merchant Tag:</strong> {session.tagID}</p>
          <p><strong>Session ID:</strong> {session.merchantId}</p>
          <p><strong>Session Type:</strong> {session.type}</p>
        </div>
      )}

      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="cta__button" onClick={() => setFlow("live-payments")}>
          View Live Payments
        </button>

        <button className="cta__button" onClick={() => setFlow("refund-void")}>
          Refund / Void Payments
        </button>

        <button className="cta__button" onClick={() => setFlow("identity")}>
          Merchant Identity Card
        </button>

        <button className="cta__button" onClick={() => setFlow("merchant-dashboard")}>
          Start New Session
        </button>
      </div>
    </div>
  );
}
