// src/flows/Flow7Processing.jsx

import { useEffect, useState } from "react";
import { decryptPayload } from "../Utils/Token";

export default function Flow7Processing({ setFlow }) {
  const [status, setStatus] = useState("Processing payment...");
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function processPayment() {
      try {
        // Retrieve encrypted QR token from localStorage
        const encrypted = JSON.parse(localStorage.getItem("ht_last_qr_token"));

        if (!encrypted) {
          setStatus("No payment token found.");
          setDone(true);
          return;
        }

        // Decrypt the payload
        const payload = await decryptPayload(encrypted);

        // Simulate backend delay
        setTimeout(() => {
          // Save transaction to logs
          const logs = JSON.parse(localStorage.getItem("ht_logs") || "[]");
          logs.push({
            ...payload,
            id: crypto.randomUUID(),
            processedAt: Date.now()
          });
          localStorage.setItem("ht_logs", JSON.stringify(logs));

          setStatus("Payment processed successfully.");
          setDone(true);
        }, 1500);

      } catch (err) {
        console.error(err);
        setStatus("Error processing payment.");
        setDone(true);
      }
    }

    processPayment();
  }, []);

  const handleContinue = () => {
    setFlow(4); // Go to Flow 4 — Confirmation
  };

  return (
    <div className="ht-container">
      <h2>Flow 7 — Processing</h2>
      <p>{status}</p>

      {!done && <p>⏳ Please wait...</p>}

      {done && (
        <button className="cta__button" onClick={handleContinue}>
          Continue
        </button>
      )}
    </div>
  );
}
