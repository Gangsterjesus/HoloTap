// src/flows/Flow7Processing.jsx

import { useEffect } from "react";
import { decryptPayload } from "../Utils/Token";

const LAST_TOKEN_KEY = "ht_last_qr_token";

export default function Flow7Processing({ qrTokenObject, setFlow }) {
  useEffect(() => {
    async function processToken() {
      try {
        // Ensure token exists
        if (!qrTokenObject) {
          alert("No QR token found.");
          setFlow(5); // Back to dashboard
          return;
        }

        const currentTokenString = JSON.stringify(qrTokenObject);
        const lastToken = localStorage.getItem(LAST_TOKEN_KEY);

        // Replay‑attack prevention
        if (lastToken && lastToken === currentTokenString) {
          alert("This QR code has already been used.");
          setFlow(4); // Still show success, but do not re-log
          return;
        }

        // Decrypt token
        const payload = await decryptPayload(qrTokenObject);

        // Build log entry
        const logEntry = {
          id: crypto.randomUUID(),
          amount: payload.amount,
          description: payload.description || "",
          userId: payload.userId,
          sessionId: payload.sessionId,
          processedAt: Date.now()
        };

        // Save log
        const rawLogs = localStorage.getItem("ht_logs");
        const logs = rawLogs ? JSON.parse(rawLogs) : [];
        logs.push(logEntry);
        localStorage.setItem("ht_logs", JSON.stringify(logs));

        // Save last token to prevent replay
        localStorage.setItem(LAST_TOKEN_KEY, currentTokenString);

        // Move to confirmation
        setFlow(4);
      } catch (error) {
        console.error("Flow 7 error:", error);
        alert("The payment token is invalid or expired.");
        setFlow(5);
      }
    }

    processToken();
  }, [qrTokenObject, setFlow]);

  return (
    <div className="ht-container">
      <h2>Flow 7 — Processing</h2>
      <p>Processing your payment…</p>
    </div>
  );
}
