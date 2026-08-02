/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/public/Onboarding.jsx
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

export default function Onboarding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* Title */}
      <h1 className="text-4xl font-bold text-holotap-primary mb-4 tracking-tight">
        Onboarding
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-center max-w-xl mb-10">
        Start your HoloTap profile. This takes less than 2 minutes.
      </p>

      {/* Form */}
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-6">

        {/* Display Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Display Name</label>
          <input
            type="text"
            placeholder="Your public name"
            className="border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-holotap-accent"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-holotap-accent"
          />
        </div>

        {/* Creator Type (renamed to Profile Type) */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Profile Type</label>
          <select className="border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-holotap-accent">
            <option>Content Creator</option>
            <option>Merchant</option>
            <option>Performer</option>
            <option>Private Operator</option>
          </select>
        </div>

        {/* Button */}
        <button className="bg-holotap-accent text-black font-semibold py-3 rounded-lg shadow hover:shadow-lg transition">
          Continue
        </button>

      </form>
    </div>
  );
}
