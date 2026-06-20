/**
 * ============================================================
 *  HoloTap — Consumer Payment Confirmation Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays the final confirmation state to the consumer after
 *  completing a payment. This screen is shown once the consumer
 *  has finished the payment flow and is ready to return home.
 *
 *  Architecture Notes:
 *  - Pure UI component; contains no business logic.
 *  - Designed for future backend expansion:
 *        • Displaying payment metadata
 *        • Showing merchant confirmation details
 *        • Loyalty or receipt integration
 *  - Navigation controlled by React Router.
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, minimal, user‑friendly design.
 *
 * ============================================================
 */

import { useNavigate, useParams } from "react-router-dom";

export default function ConsumerConfirm() {
  const navigate = useNavigate();
  const { paymentId } = useParams();

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Payment Complete</h2>

      <p style={{ marginTop: 10 }}>
        Your payment has been successfully submitted.
      </p>

      {paymentId && (
        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Payment ID: <strong>{paymentId}</strong>
        </p>
      )}

      <div
        style={{
          marginTop: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "6px solid #00ff99",
          borderTopColor: "#222",
          animation: "spin 1s linear infinite",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />

      <p style={{ marginTop: 20, fontStyle: "italic" }}>
        Thank you for using HoloTap.
      </p>

      <button
        className="cta__button"
        style={{ marginTop: 30 }}
        onClick={() => navigate("/consumer")}
      >
        Return Home
      </button>
    </div>
  );
}
