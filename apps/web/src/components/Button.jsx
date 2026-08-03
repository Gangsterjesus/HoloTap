/**
 * ============================================================
 *  HoloTap — Button Component
 *  File: src/components/Button.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v-2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
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

const base =
  "px-4 py-2 rounded-lg font-medium text-[15px] transition focus:outline-none";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  ghost: "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50",
};

export default function Button({ variant = "primary", disabled, onClick, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        ${base}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}
