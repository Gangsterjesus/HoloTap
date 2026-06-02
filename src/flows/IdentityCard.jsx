/**
 * ============================================================
 *  HoloTap — Merchant Identity Card (Flow 6)
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays the authenticated merchant’s identity profile and
 *  generates a secure, time‑limited identity QR code using the
 *  HoloTap token encryption system. This QR is used for merchant
 *  verification, onboarding, and cross‑device identity recovery.
 *
 *  Flow Context:
 *  - Part of the Merchant UX pathway.
 *  - Replaces the academic scaffold “Flow 6 — Identity Card”.
 *  - Accessed only after a valid merchant session is restored.
 *
 *  Security Notes:
 *  - Session is validated on mount via getSession() + touchSession().
 *  - Identity QR is encrypted using encryptPayload() (AES + HMAC).
 *  - QR expires after 5 minutes (TTL enforced in Token.js).
 *  - No personal data is stored in the QR; only encrypted payload.
 *
 *  Data Model:
 *  payload = {
 *    userId: string,
 *    name: string,
 *    mobile: string,
 *    issuedAt: number
 *  }
 *
 *  Dependencies:
 *  - userService.getUser()          → loads merchant profile
 *  - token.encryptPayload()         → generates encrypted QR payload
 *  - session.getSession()           → session gate
 *  - session.touchSession()         → extend session TTL
 *  - react-qr-code                  → QR rendering
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { getUser } from "../services/userService";
import { encryptPayload } from "../utils/token";
import { getSession, touchSession } from "../utils/session";

export default function Flow6IdentityCard({ setFlow }) {
  const [user, setUser] = useState(null);
  const [identityQR, setIdentityQR] = useState(null);

  // Session gate
  useEffect(() => {
    const session = getSession();
    if (!session) {
      alert("Your session has expired. Please log in again.");
      setFlow(2); // Back to login
      return;
    }
    touchSession();
  }, [setFlow]);

  // Load user + generate identity QR
  useEffect(() => {
    const u = getUser();
    setUser(u);

    if (u) {
      const payload = {
        userId: u.userId,
        name: u.name,
        mobile: u.mobile,
        issuedAt: Date.now()
      };

      encryptPayload(payload).then((encrypted) => {
        setIdentityQR(JSON.stringify(encrypted));
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="flow6__container">
        <h2 className="flow6__title">Flow 6 — Merchant Identity</h2>
        <p>No merchant profile found.</p>

        <button className="cta__button" onClick={() => setFlow(1)}>
          Go to Registration
        </button>
      </div>
    );
  }

  return (
    <div className="flow6__container">
      <h2 className="flow6__title">Flow 6 — Merchant Identity</h2>
      <p className="flow6__subtitle">Your official HoloTap merchant identity.</p>

      <div className="flow6__card">
        <h3 className="flow6__name">{user.name}</h3>

        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Mobile:</strong> {String(user.mobile).trim()}</p>

        {identityQR && (
          <div className="flow6__qrblock">
            <h4>Identity QR</h4>
            <QRCode value={identityQR} size={160} />

            <p className="flow6__expiry">
              This identity QR expires in 5 minutes.
            </p>

            <button
              className="cta__button"
              onClick={() => window.location.reload()}
            >
              Regenerate Identity QR
            </button>
          </div>
        )}
      </div>

      <button
        className="cta__button flow6__back"
        onClick={() => setFlow(5)} // Back to Merchant Dashboard
      >
        Back to Dashboard
      </button>
    </div>
  );
}
