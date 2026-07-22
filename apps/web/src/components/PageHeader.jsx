/**
 * ============================================================
 *  HoloTap — Page Header Component
 *  File: src/components/PageHeader.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a consistent header for all HoloTap pages, including
 *  title, optional subtitle, and optional right‑side actions.
 *
 *  Responsibilities:
 *  - Display page title
 *  - Display optional subtitle
 *  - Display optional action buttons or controls
 * ============================================================
 */

import "./PageHeader.css";

/* ============================
   COMPONENT
   ============================ */

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">

      {/* ============================
          LEFT SIDE — TITLES
          ============================ */}
      <div className="page-header-left">
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>

      {/* ============================
          RIGHT SIDE — ACTIONS
          ============================ */}
      {actions && (
        <div className="page-header-actions">
          {actions}
        </div>
      )}
    </div>
  );
}
