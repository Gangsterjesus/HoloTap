/**
 * ============================================================
 *  HoloTap — Admin Home Page
 *  File: src/pages/admin/AdminHome.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  The central hub for HoloTap administrators. Provides access
 *  to system logs, refund operations, live monitoring, and
 *  platform‑wide oversight tools. Restricted to admin role only.
 *
 *  Responsibilities:
 *  - Display core admin metrics
 *  - Provide quick access to admin tools
 *  - Maintain consistent v2 UI structure
 * ============================================================
 */

import Layout from "../../../components/Layout.jsx";
import PageHeader from "../../../components/PageHeader.jsx";
import DashboardGrid from "../../../components/DashboardGrid.jsx";
import DashboardCard from "../../../components/DashboardCard.jsx";
import Button from "../../../components/Button.jsx";

/* ============================
   PAGE
   ============================ */

export default function AdminHome() {
  return (
    <Layout>
      <PageHeader
        title="Admin Home"
        subtitle="System‑level controls and monitoring tools for HoloTap operations"
      />

      {/* Summary Metrics */}
      <DashboardGrid>
        <DashboardCard title="Total Creators" value="0" />
        <DashboardCard title="Active Badges" value="0" />
        <DashboardCard title="System Alerts" value="None" />
      </DashboardGrid>

      {/* Admin Actions */}
      <div className="mt-10 flex gap-4 flex-wrap">
        <Button variant="primary" onClick={() => (window.location.href = "/admin/logs")}>
          View Logs
        </Button>

        <Button variant="primary" onClick={() => (window.location.href = "/admin/refunds")}>
          Refunds
        </Button>

        <Button variant="primary" onClick={() => (window.location.href = "/admin/live")}>
          Live Monitoring
        </Button>
      </div>
    </Layout>
  );
}
