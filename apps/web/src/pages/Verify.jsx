/**
 * ============================================================
 *  HoloTap Engineering — Badge Verification Page
 *  File: src/pages/Verify.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Public verification page for scanning and validating HoloTap
 *    holographic badges. Used by customers, clients, and operators
 *    to confirm authenticity before initiating a payment or identity
 *    check.
 *
 *  Notes:
 *    - Inline styles removed
 *    - Tailwind v4 CSS-first UI pipeline
 *    - Deterministic architecture only
 * ============================================================
 */

import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function Verify() {
  return (
    <Layout
      title="Verify Badge"
      subtitle="Public badge authenticity verification"
    >
      <PageHeader
        title="Verify a HoloTap Badge"
        subtitle="Enter a badge code or scan the hologram"
        actions={null}
      />

      {/* Badge Code Input */}
      <div className="mt-8 max-w-lg mx-auto">
        <label className="block text-gray-700 font-medium mb-2">
          Badge Code
        </label>

        <input
          type="text"
          placeholder="Enter badge code (e.g., HT-49302)"
          className="w-full px-4 py-3 border rounded-lg text-gray-800 shadow-sm"
        />

        <button
          className="mt-4 w-full px-4 py-3 bg-black text-white font-semibold rounded-lg"
        >
          Verify Badge
        </button>
      </div>

      {/* Scan Instead */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Scan Instead
        </h2>

        <p className="text-gray-600 mt-2">
          Use your mobile device to scan the hologram and verify instantly.
        </p>

        <a
          href="/scan"
          className="inline-block mt-4 px-6 py-3 bg-holotap-accent text-black font-semibold rounded-lg shadow-md hover:shadow-xl transition"
        >
          Open Scanner
        </a>
      </div>
    </Layout>
  );
}
