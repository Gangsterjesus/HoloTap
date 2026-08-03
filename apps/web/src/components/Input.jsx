/**
 * ============================================================
 *  HoloTap — Input Component
 *  File: src/components/Input.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v-2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
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
    <div className="flex flex-col gap-2 mb-5">

      {/* ============================
          LABEL
          ============================ */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* ============================
          INPUT FIELD
          ============================ */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          px-4 py-2
          rounded-lg
          border
          text-[15px]
          transition
          outline-none
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          focus:border-blue-500
        `}
      />

      {/* ============================
          ERROR MESSAGE
          ============================ */}
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
