/**
 * HoloTap — Flow 7A: Consumer Payment Processing
 * Author: Raymond Newton
 * Date: 01 June 2026
 *
 * Purpose:
 * Verifies the QR token generated in Flow 3 and transitions to
 * Flow 4 (Payment Confirmation) once the token is valid.
 */

import { useEffect, useState } from "react";
import { decryptPayload } from "../utils/token";
import { formatCurrency } from "../utils/format";

export default function Flow7Processing({ setFlow }) {
  const [status, setStatus] = useState("processing");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function verifyToken() {
      try {
        const stored = localStorage.getItem("ht_last_qr_token");

        if (!stored) {
          setError("No payment token found. Please generate a new QR code.");
          setStatus("error");
          return;
        }

        const tokenObject = JSON.parse(stored);
        const payload = await decryptPayload(tokenObject);

        setDetails(payload);
        setStatus("success");

        // Persist verified transaction
        const logs = JSON.parse(localStorage.getItem("ht_logs") || "[]");
        logs.push({
          id: crypto.randomUUID(),
          amount: payload.amount,
          description: payload.description,
          processedAt: Date.now()
        });
        localStorage.setItem("ht_logs", JSON.stringify(logs));

        // Redirect to Flow 4 (Payment Confirmation)
        setTimeout(() => setFlow(4), 1200);

      } catch (err) {
        console.error("Token verification failed:", err);
        setError("Payment token is invalid or has expired.");
        setStatus("error");
      }
    }

    verifyToken();
  }, [setFlow]);

  if (status === "processing") {
    return (
      <div className="flow7a__container">
        <h2 className="flow7a__title">Flow 7 — Processing Payment</h2>
        <p>Please wait while we verify your payment token…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flow7a__container">
        <h2 className="flow7a__title">Flow 7 — Processing Error</h2>
        <p>{error}</p>

        <button className="cta__button" onClick={() => setFlow(3)}>
          Back to Payment
        </button>
      </div>
    );
  }

  return (
    <div className="flow7a__container">
      <h2 className="flow7a__title">Flow 7 — Payment Verified</h2>

      {details && (
        <div className="flow7a__card">
          <p>
            <strong>Amount:</strong> {formatCurrency(details.amount)}
          </p>

          {details.description && (
            <p>
              <strong>Description:</strong> {details.description}
            </p>
          )}
        </div>
      )}

      <p>Redirecting to confirmation…</p>
    </div>
  );
}
