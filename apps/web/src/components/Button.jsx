/**
 * ============================================================
 *  HoloTap — Button Component
 *  File: src/components/Button.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a reusable button component with consistent styling
 *  across the HoloTap web application.
 *
 *  Responsibilities:
 *  - Render primary, secondary, and ghost button variants
 *  - Support click actions
 *  - Support disabled state
 * ============================================================
 */

import "./Button.css";

/* ============================
   COMPONENT
   ============================ */

export default function Button({ variant = "primary", disabled, onClick, children }) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
