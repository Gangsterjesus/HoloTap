/**
 * File: QRActivation.jsx
 * Project: HoloTap Web UI
 * Screen: QR Activation Screen
 *
 * Author: Raymond Newton (E5357171)
 * Date: 24 July 2026
 *
 * Description:
 *  - Merchant-facing screen for generating secure QR payment sessions.
 *  - Calls /session/create on HoloTapServer.
 *  - Renders QR code, session token, and live expiry countdown.
 *  - Provides regeneration flow when QR expires.
 *
 * Notes:
 *  - Styling is external (styles/qrActivation.css).
 *  - Countdown auto-clears and resets on new QR generation.
 */

import { useState, useEffect } from "react";
import QRCode from "react-qrcode-svg";
import "../../styles/qrActivation.css";

export default function QRActivation() {
  // -------------------------------
  // State
  // -------------------------------
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [expires, setExpires] = useState(null);
  const [error, setError] = useState(null);

  // -------------------------------
  // Generate QR Session
  // -------------------------------
  async function generateQR() {
    try {
      setLoading(true);
      setError(null);
      setToken(null);

      const response = await fetch("http://192.168.1.205:3001/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchantId: "MERCHANT_123" })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate QR session");
      }

      setToken(data.token);
      setExpires(data.expiresIn ?? 30);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  // Countdown Timer
  // -------------------------------
  useEffect(() => {
    if (!token || !expires) return;

    const interval = setInterval(() => {
      setExpires((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [token, expires]);

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="qr-wrapper">
      <h1 className="qr-title">QR Activation</h1>
      <p className="qr-subtitle">Generate a QR code to start a secure payment session.</p>

      {loading && <p className="qr-loading">Generating QR…</p>}
      {error && <p className="qr-error">{error}</p>}

      {!token && !loading && (
        <button className="qr-button" onClick={generateQR}>
          Generate QR
        </button>
      )}

      {token && (
        <div className="qr-content">
          <div className="qr-code">
            <QRCode value={token} size={220} />
          </div>

          <p className="qr-label">Session Token:</p>
          <code className="qr-token">{token}</code>

          <p className={expires > 0 ? "qr-active" : "qr-expired"}>
            {expires > 0
              ? `Expires in: ${expires}s`
              : "QR expired — generate a new one"}
          </p>

          {expires === 0 && (
            <button
              className="qr-button"
              onClick={() => {
                setToken(null);
                setExpires(null);
              }}
            >
              Generate Another
            </button>
          )}
        </div>
      )}
    </div>
  );
}
