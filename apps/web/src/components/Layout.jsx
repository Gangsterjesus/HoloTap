/**
 * ============================================================
 *  HoloTap — Global Layout Wrapper
 *  File: src/components/Layout.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a consistent page layout for the HoloTap web app,
 *  including spacing, container width, and optional page titles.
 *
 *  Responsibilities:
 *  - Wrap all page content
 *  - Provide global spacing and structure
 *  - Support optional page titles
 * ============================================================
 */

import "./Layout.css";

/* ============================
   COMPONENT
   ============================ */

export default function Layout({ title, children }) {
  return (
    <div className="layout">

      {/* ============================
          PAGE TITLE (OPTIONAL)
          ============================ */}
      {title && <h1 className="layout-title">{title}</h1>}

      {/* ============================
          PAGE CONTENT
          ============================ */}
      <div className="layout-content">
        {children}
      </div>
    </div>
  );
}
