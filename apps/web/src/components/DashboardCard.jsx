/**
 * ============================================================
 *  HoloTap — Dashboard Card Component
 *  File: src/components/DashboardCard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v-2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
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

export default function DashboardCard({ title, value, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      {/* ============================
          TITLE
          ============================ */}
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      {/* ============================
          VALUE (OPTIONAL)
          ============================ */}
      {value && (
        <div className="text-3xl font-bold mb-4">
          {value}
        </div>
      )}

      {/* ============================
          CONTENT
          ============================ */}
      {children && (
        <div className="text-gray-700 text-[15px]">
          {children}
        </div>
      )}
    </div>
  );
}
