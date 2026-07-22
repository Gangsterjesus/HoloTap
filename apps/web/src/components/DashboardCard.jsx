/**
 * ============================================================
 *  HoloTap — Dashboard Card Component
 *  File: src/components/DashboardCard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a reusable card component for dashboard metrics,
 *  analytics, payment summaries, and admin/creator insights.
 *
 *  Responsibilities:
 *  - Display a title
 *  - Display optional value or content
 *  - Provide consistent styling across all dashboard pages
 * ============================================================
 */

import "./DashboardCard.css";

/* ============================
   COMPONENT
   ============================ */

export default function DashboardCard({ title, value, children }) {
  return (
    <div className="dashboard-card">

      {/* ============================
          TITLE
          ============================ */}
      <h2 className="dashboard-card-title">{title}</h2>

      {/* ============================
          VALUE (OPTIONAL)
          ============================ */}
      {value && <div className="dashboard-card-value">{value}</div>}

      {/* ============================
          CONTENT
          ============================ */}
      {children && (
        <div className="dashboard-card-content">
          {children}
        </div>
      )}
    </div>
  );
}
