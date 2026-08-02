/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/UnderConstruction.jsx
   Author: Raymond Newton
   Project: HoloTap Identity & QR Security Platform
   Layer: web-ui
   Revision: v2 — Unified Web & Mobile Architecture
   ------------------------------------------------------------
   Notes:
   - Deterministic architecture only
   - Zero template styling, zero boilerplate
   - Tailwind v4 CSS-first UI pipeline
   - Web UI must remain modular and stateless
   - Identity, QR, and organisation layers isolated
   - Explicit state transitions; no hidden side-effects
   ============================================================ */

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-holotap-primary mb-4 tracking-tight">
        HoloTap Web UI
      </h1>

      {/* Message */}
      <p className="text-gray-600 text-center max-w-lg mb-8">
        This section of the HoloTap platform is currently under construction.
        The identity, organisation, and QR‑security modules are being prepared
        for deployment.
      </p>

      {/* Status Box */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <p className="text-sm text-gray-500 mb-2">System Status</p>
        <p className="text-holotap-primary font-semibold">
          Web UI: Initialisation Phase
        </p>
      </div>

    </div>
  );
}
