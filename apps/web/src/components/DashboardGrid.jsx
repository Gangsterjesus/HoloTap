/**
 * ============================================================
 *  HoloTap — Dashboard Grid Component
 *  File: src/components/DashboardGrid.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a responsive grid layout for dashboard cards and
 *  analytics components across creator and admin dashboards.
 *
 *  Responsibilities:
 *  - Render children in a responsive grid
 *  - Maintain consistent spacing and alignment
 * ============================================================
 */

import "./DashboardGrid.css";

/* ============================
   COMPONENT
   ============================ */

export default function DashboardGrid({ children }) {
  return (
    <div className="dashboard-grid">
      {children}
    </div>
  );
}
