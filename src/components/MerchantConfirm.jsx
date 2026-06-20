/**
 * ============================================================
 *  HoloTap — Merchant Payment Confirmation (Backend Approval)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the merchant‑side interface for confirming a
 *  consumer‑initiated payment. This screen is displayed after
 *  the merchant selects a pending payment from the live payment
 *  list or receives a payment identifier from the backend.
 *
 *  Architecture Notes:
 *  - Calls backend confirmation endpoint via paymentApiService.js.
 *  - Redirects to /merchant/status after successful confirmation.
 *  - Displays loading, error, and confirmation states.
 *  - No business logic beyond payment approval.
 *
 *  Engineering Notes:
 *  - All imports validated for existence and case‑sensitivity.
 *  - Handles missing payment identifiers gracefully.
 *  - Designed for backend expansion (e.g., rejection flow).
 *  - Fully TM352‑compatible and Vite‑compliant.
 *
 * ============================================================
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmPayment } from "../services/paymentApiService.js";

export default function MerchantConfirm() {
  const navigate = useNavigate();
  const { paymentId } = useParams();

  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!paymentId) {
      setError("No payment identifier provided");
    }
  }, [paymentId]);

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await confirmPayment(paymentId);

      if (!response.success) {
        setError("Failed to confirm payment");
        setLoading(false);
        return;
      }

      setConfirmed(true);

      // Navigate back to merchant status after a short delay
      setTimeout(() => {
        navigate("/merchant/status", { replace: true });
      }, 1200);

    } catch (err) {
      setError("Server error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Merchant Payment Confirmation</h2>

      <p><strong>Payment ID:</strong> {paymentId}</p>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}

      {!confirmed && (
        <button
          className="cta__button"
          onClick={handleConfirm}
          disabled={loading || !paymentId}
          style={{ marginTop: 20 }}
        >
          {loading ? "Confirming..." : "Confirm Payment"}
        </button>
      )}

      {confirmed && (
        <p style={{ marginTop: 20, color: "limegreen", fontWeight: "bold" }}>
          Payment Confirmed ✔
        </p>
      )}
    </div>
  );
}
