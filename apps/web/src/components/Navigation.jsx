/**
 * ============================================================
 *  HoloTap — Global Navigation Component (Navigation.jsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides global navigation for all HoloTap frontend flows.
 *  Uses React Router <Link> components to enable URL‑driven
 *  navigation across consumer, merchant, and admin areas.
 *
 *  Architecture Notes:
 *  - Pure presentational component.
 *  - No business logic or identity logic.
 *  - Integrates with Layout.jsx for consistent placement.
 *  - Supports future active‑link highlighting.
 *
 *  Engineering Notes:
 *  - Uses semantic <nav> container.
 *  - Minimal inline styling; visual design handled in CSS.
 *  - All routes validated for existence in Holo.jsx.
 *  - Fully Vite‑compliant.
 *
 * ============================================================
 */

import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        marginBottom: 20,
        flexWrap: "wrap"
      }}
    >
      <Link className="cta__button" to="/">Home</Link>
      <Link className="cta__button" to="/register">Register</Link>
      <Link className="cta__button" to="/consumer">Consumer Home</Link>
      <Link className="cta__button" to="/pay">Consumer Payment</Link>
      <Link className="cta__button" to="/merchant">Merchant Dashboard</Link>
      <Link className="cta__button" to="/merchant/status">Merchant Status</Link>
      <Link className="cta__button" to="/merchant/confirm">Merchant Confirm</Link>
      <Link className="cta__button" to="/identity">Identity</Link>
      <Link className="cta__button" to="/admin">Admin</Link>
      <Link className="cta__button" to="/live">Live Payments</Link>
      <Link className="cta__button" to="/refund">Refund/Void</Link>
    </nav>
  );
}
