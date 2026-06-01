// src/flows/Flow6IdentityCard.jsx

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { getUser } from "../services/UserService";
import { encryptPayload } from "../Utils/Token";
import { getSession, touchSession } from "../Utils/Session";



// formatCurrency not needed in this component

export default function Flow6IdentityCard({ setFlow }) {
  const [user, setUser] = useState(null);
  const [identityQR, setIdentityQR] = useState(null);

  // 🔐 Session‑gate patch
  useEffect(() => {
    const session = getSession();
    if (!session) {
      alert("Your session has expired. Please log in again.");
      setFlow(2);
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
      <div className="ht-container">
        <h2>Flow 6 — Identity Card</h2>
        <p>No user profile found.</p>
        <button className="cta__button" onClick={() => setFlow(1)}>
          Go to Registration
        </button>
      </div>
    );
  }

  return (
    <div className="ht-container">
      <h2>Flow 6 — Identity Card</h2>
      <p>Your official HoloTap creator identity.</p>

      <div className="ht-card" style={{ marginTop: 20, padding: 20 }}>
        <h3>{user.name}</h3>

        <p><strong>User ID:</strong> {user.userId}</p>

        {/* ⭐ Mobile formatting fallback */}
        <p><strong>Mobile:</strong> {String(user.mobile).trim()}</p>

        {identityQR && (
          <div style={{ marginTop: 20 }}>
            <h4>Identity QR</h4>
            <QRCode value={identityQR} size={160} />

            {/* ⭐ Expiry notice */}
            <p style={{ marginTop: 10, fontSize: "0.9em", opacity: 0.7 }}>
              This identity QR expires in 5 minutes.
            </p>

            {/* ⭐ Regenerate QR */}
            <button
              className="cta__button"
              onClick={() => window.location.reload()}
              style={{ marginTop: 10 }}
            >
              Regenerate Identity QR
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="cta__button" onClick={() => setFlow(5)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
