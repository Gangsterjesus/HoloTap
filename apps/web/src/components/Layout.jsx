/**
 * ============================================================
 *  HoloTap — Global Layout Wrapper
 *  File: src/components/Layout.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v-2 — Unified Web & Mobile Architecture
 *  Date: 03 August 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a consistent global layout shell for the HoloTap web
 *  application, including spacing, container width, and optional
 *  page titles. Tailwind v4 CSS-first architecture.
 *
 *  Responsibilities:
 *  - Wrap all page content
 *  - Provide deterministic spacing and structure
 *  - Support optional page titles and subtitles
 *  - Maintain modular, stateless UI foundation
 * ============================================================
 */

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="px-8 py-10 max-w-[1100px] mx-auto">

      {/* ============================
          PAGE HEADER (OPTIONAL)
          ============================ */}
      {title && (
        <header className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 text-lg">{subtitle}</p>
          )}
        </header>
      )}

      {/* ============================
          PAGE CONTENT
          ============================ */}
      <main className="bg-white p-6 rounded-xl shadow-md">
        {children}
      </main>
    </div>
  );
}
