/**
 * ============================================================
 *  HoloTap — Input Component
 *  File: src/components/Input.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a reusable input field component with consistent
 *  styling across onboarding, identity, settings, and dashboard
 *  forms.
 *
 *  Responsibilities:
 *  - Render labeled input fields
 *  - Support placeholder text
 *  - Support controlled values
 *  - Support error messages
 * ============================================================
 */

import "./Input.css";

/* ============================
   COMPONENT
   ============================ */

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  disabled = false,
}) {
  return (
    <div className="input-wrapper">

      {/* ============================
          LABEL
          ============================ */}
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      {/* ============================
          INPUT FIELD
          ============================ */}
      <input
        type={type}
        className={`input-field ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* ============================
          ERROR MESSAGE
          ============================ */}
      {error && (
        <p className="input-error-message">
          {error}
        </p>
      )}
    </div>
  );
}
