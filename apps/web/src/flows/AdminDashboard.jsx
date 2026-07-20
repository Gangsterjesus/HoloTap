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

import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Administrative Dashboard</h2>
      <p>System‑level controls and monitoring tools for HoloTap operators.</p>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        <Link className="cta__button" to="/live">
          View Live Payments
        </Link>

        <Link className="cta__button" to="/refund">
          Refund / Void Payments
        </Link>

        <Link className="cta__button" to="/identity">
          Merchant Identity Card
        </Link>

        <Link className="cta__button" to="/merchant/status">
          Merchant Status Overview
        </Link>

        <Link className="cta__button" to="/merchant">
          Start New Merchant Session
        </Link>
      </div>
    </div>
  );
}

