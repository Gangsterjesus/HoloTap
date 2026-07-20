/**
 * ============================================================
 *  HoloTap — Product Features Component
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays a curated list of HoloTap’s core product features.
 *  Used on landing screens and promotional sections to highlight
 *  the platform’s unique capabilities.
 *
 *  Architecture Notes:
 *  - Pure presentational component.
 *  - No business logic or backend integration.
 *  - Designed for future expansion:
 *        • Icons or illustrations
 *        • Dynamic feature list from backend
 *        • Animation hooks for marketing pages
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - Clean, accessible, mobile‑friendly layout.
 *  - Uses explicit class names for styling consistency.
 *
 * ============================================================
 */

export default function Features() {
  return (
    <section className="features">
      <h2 className="features__title">Why HoloTap?</h2>

      <ul className="features__list">
      <li className="features__item">
  Holographic QR and account-to-account payments
</li>

      </ul>
    </section>
  );
}
