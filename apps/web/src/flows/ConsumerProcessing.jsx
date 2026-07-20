/**
 * ============================================================
 *  HoloTap — Consumer Payment Processing Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays a transitional “processing” state to the consumer
 *  after a payment has been created. This screen prevents
 *  duplicate submissions and prepares the user for the final
 *  confirmation stage once the merchant approves the payment.
 *
 *  Architecture Notes:
 *  - Pure UI component; contains no business logic.
 *  - Designed for future backend expansion:
 *        • Polling for payment status
 *        • WebSocket real‑time updates
 *        • Automatic transition to confirmation screen
 *  - Navigation controlled by React Router.
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, minimal, user‑friendly design.
 *
 * ============================================================
 */

import { useNavigate } from "react-router-dom";

export default function ConsumerProcessing() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Processing Payment</h2>

      <p style={{ marginTop: 10 }}>
        Your payment request has been sent to the merchant.
      </p>

      <p style={{ marginTop: 10 }}>
        Please wait while the merchant confirms the transaction.
      </p>

      <div
        style={{
          marginTop: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "6px solid #555",
          borderTopColor: "#00eaff",
          animation: "spin 1s linear infinite",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />

      <p style={{ marginTop: 20, fontStyle: "italic" }}>
        This may take a few moments.
      </p>

      <button
        className="cta__button"
        style={{ marginTop: 30 }}
        onClick={() => navigate("/consumer")}
      >
        Cancel and Return Home
      </button>
    </div>
  );
}
