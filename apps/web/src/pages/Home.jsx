/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/public/Home.jsx
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">

      {/* Title */}
      <h1 className="text-5xl font-bold text-holotap-primary mb-4 tracking-tight">
        HoloTap
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 max-w-xl text-center mb-8">
        Secure QR‑identity, instant verification, and organisation‑grade access
        control. Built for the next generation of digital trust.
      </p>

      {/* CTA */}
      <a
        href="/onboarding"
        className="px-6 py-3 bg-holotap-accent text-black font-semibold rounded-lg shadow-md hover:shadow-xl transition"
      >
        Get Started
      </a>

      {/* Status Box */}
      <div className="mt-12 bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <p className="text-sm text-gray-500 mb-2">Platform Status</p>
        <p className="text-holotap-primary font-semibold">
          Identity & QR Modules: Initialisation Phase
        </p>
      </div>

    </div>
  );
}
