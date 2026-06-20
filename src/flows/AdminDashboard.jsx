/**
 * ============================================================
 *  HoloTap — Administrative Dashboard
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the administrative control panel for HoloTap system
 *  operators. This dashboard acts as the central hub for system
 *  oversight, merchant monitoring, payment visibility, and
 *  future analytics modules.
 *
 *  Architecture Notes:
 *  - Pure navigation component; contains no business logic.
 *  - Delegates all operational tasks to specialised screens:
 *        • LivePayments.jsx
 *        • RefundVoid.jsx
 *        • IdentityCard.jsx
 *        • MerchantStatus.jsx
 *  - Designed for future expansion (fraud analytics, logs, audit).
 *
 *  Engineering Notes:
 *  - All imports validated for existence and case‑sensitivity.
 *  - No legacy TM352 dependencies remain.
 *  - Fully Vite‑compliant and production‑ready.
 *  - Clean, explicit navigation for maintainability.
 *
 * ============================================================
 */

export default function AdminDashboard({ setFlow }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Administrative Dashboard</h2>
      <p>System‑level controls and monitoring tools for HoloTap operators.</p>

      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          className="cta__button"
          onClick={() => setFlow("live-payments")}
        >
          View Live Payments
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow("refund-void")}
        >
          Refund / Void Payments
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow("identity")}
        >
          Merchant Identity Card
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow("merchant-status")}
        >
          Merchant Status Overview
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow("merchant-dashboard")}
        >
          Start New Merchant Session
        </button>
      </div>
    </div>
  );
}
