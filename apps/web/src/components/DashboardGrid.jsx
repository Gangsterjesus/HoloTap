/**
 * ============================================================
 *  HoloTap — Dashboard Grid Component
 *  File: src/components/DashboardGrid.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
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

export default function DashboardGrid({ children }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
