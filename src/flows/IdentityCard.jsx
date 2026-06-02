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
