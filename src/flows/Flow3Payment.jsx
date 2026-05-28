// src/flows/Flow3Payment.jsx

import { useState } from "react";
import QRCode from "react-qr-code";
import { getSession } from "../Utils/Session";
import { encryptPayload } from "../Utils/Token";

export default function Flow3Payment({ setFlow }) {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");

    if (!amount.trim()) {
      setError("Please enter an amount");
      return;
    }

    const session = getSession();
    if (!session) {
      setError("No active session. Please log in again.");
      return;
    }

    // Build payment payload
    const payload = {
      sessionId: session.token,
      userId: session.userId,
      amount: Number(amount),
      description: desc || "",
      timestamp: Date.now()
    };

    // Encrypt payload
    const encrypted = await encryptPayload(payload);

    // PATCH: Save encrypted token for Flow 7
    localStorage.setItem("ht_last_qr_token", JSON.stringify(encrypted));

    // Store QR data for display
    setQrData(JSON.stringify(encrypted));
  };

  const handleContinue = () => {
    setFlow(7); // Go to Flow 7 — Processing
  };

  return (
    <div className="ht-container">
      <h2>Flow 3 — Payment</h2>
      <p>Enter payment details to generate a secure QR code.</p>

      <input
        type="number"
        placeholder="Amount (£)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="ht-input"
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="ht-input"
      />

      {error && <p className="ht-error">{error}</p>}

      <button className="cta__button" onClick={handleGenerate}>
        Generate QR
      </button>

      {qrData && (
        <div className="ht-qr-container" style={{ marginTop: 20 }}>
          <h3>Your Secure Payment QR</h3>
          <QRCode value={qrData} size={180} />
          <button className="cta__button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
