/**
 * File: QRActivationResult.jsx
 * Project: HoloTap Web UI
 * Screen: QR Activation Result Screen
 *
 * Author: Raymond Newton (E5357171)
 * Date: 24 July 2026
 *
 * Description:
 *  - Displays the result of a QR activation event.
 *  - Shows success or failure messaging to the merchant.
 *  - Provides navigation back to QR Activation or Dashboard.
 *
 * Notes:
 *  - Styling is external (styles/qrActivationResult.css).
 *  - This screen is reached after a customer scans the QR code.
 */

import { useEffect, useState } from "react";
import "../../styles/qrActivationResult.css";

export default function QRActivationResult() {
  // -----------------------------------
  // State
  // -----------------------------------
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  // -----------------------------------
  // Simulated Result Fetch
  // (Replace with real API call later)
  // -----------------------------------
  useEffect(() => {
    async function fetchResult() {
      try {
        const response = await fetch("http://192.168.1.205:3001/session/result");
        const data = await response.json();

        setStatus(data.status);
        setMessage(data.message);
      } catch (err) {
        setStatus("error");
        setMessage("Unable to retrieve activation result.");
      }
    }

    fetchResult();
  }, []);

  // -----------------------------------
  // Render
  // -----------------------------------
  return (
    <div className="qr-result-wrapper">
      <h1 className="qr-result-title">Activation Result</h1>

      {status === "success" && (
        <p className="qr-result-success">{message}</p>
      )}

      {status === "error" && (
        <p className="qr-result-error">{message}</p>
      )}

      {status === "pending" && (
        <p className="qr-result-pending">Waiting for activation…</p>
      )}

      <div className="qr-result-actions">
        <button
          className="qr-result-button"
          onClick={() => (window.location.href = "/qr/activate")}
        >
          Generate New QR
        </button>

        <button
          className="qr-result-button-secondary"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
