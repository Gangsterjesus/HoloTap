/* ============================================================
   HoloTap — Engineering Build System
   File: src/pages/admin/Enquiries.jsx
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

import Layout from "../../components/Layout.jsx";
import PageHeader from "../../components/PageHeader.jsx";

export default function Enquiries() {
  return (
    <Layout
      title="Enquiries"
      subtitle="Official public contact channels for HoloTap"
    >
      <PageHeader
        title="Enquiries"
        subtitle="Public and founder contact information"
        actions={null}
      />

      <div className="mt-6 text-gray-700 text-lg">

        <p>For general enquiries, please contact:</p>
        <p className="mt-2 font-semibold text-black">
          enquiries@holotap.co.uk
        </p>

        <p className="mt-8">For founder‑level enquiries, please contact:</p>
        <p className="mt-2 font-semibold text-black">
          ray-newton@live.co.uk
        </p>

      </div>
    </Layout>
  );
}
