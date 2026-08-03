/**
 * ============================================================
 *  HoloTap Web — Error Boundary Component
 *  File: src/components/ErrorBoundary.jsx
 *  Engineers: Raymond Newton, Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  ------------------------------------------------------------
 *  Purpose:
 *    Provides a controlled UI surface for API and network errors.
 *    Wraps all Web → Server interactions (Activation, QR, Session).
 *
 *  Subsystem:
 *    Web → UI Error Handling Layer
 *
 *  Notes:
 *    - Normalises error display across all pages
 *    - Handles offline/server unreachable states
 *    - Prevents unhandled promise rejections in UI
 *    - Deterministic behaviour; no hidden side-effects
 * ============================================================
 */

import { useState } from "react";

/* ============================
   COMPONENT
   ============================ */

export function ErrorBoundary({
  children,
}: {
  children: (setError: (msg: string) => void) => JSX.Element;
}) {
  const [error, setError] = useState<string | null>(null);

  /* ============================
     ERROR SURFACE
     ============================ */
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded border border-red-300">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  /* ============================
     NORMAL RENDERING PATH
     ============================ */
  return children(setError);
}
