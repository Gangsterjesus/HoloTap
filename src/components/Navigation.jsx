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


export default function Navigation({ setScreen }) {
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
      <button className="cta__button" onClick={() => setScreen("home")}>Home</button>
      <button className="cta__button" onClick={() => setScreen("register")}>Register</button>
      <button className="cta__button" onClick={() => setScreen("consumer-home")}>Consumer Home</button>
      <button className="cta__button" onClick={() => setScreen("consumer-payment")}>Consumer Payment</button>
      <button className="cta__button" onClick={() => setScreen("merchant-dashboard")}>Merchant Dashboard</button>
      <button className="cta__button" onClick={() => setScreen("merchant-status")}>Merchant Status</button>
      <button className="cta__button" onClick={() => setScreen("merchant-confirm")}>Merchant Confirm</button>
      <button className="cta__button" onClick={() => setScreen("identity")}>Identity</button>
      <button className="cta__button" onClick={() => setScreen("admin")}>Admin</button>
      <button className="cta__button" onClick={() => setScreen("live-payments")}>Live Payments</button>
      <button className="cta__button" onClick={() => setScreen("refund-void")}>Refund/Void</button>
    </nav>
  );
}
