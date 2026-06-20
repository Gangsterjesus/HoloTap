/**
 * ============================================================
 *  HoloTap — Global Header Component
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 * ============================================================
 *
 *  Purpose:
 *  Provides the global brand header for all HoloTap screens.
 *  Ensures the badge, title, and tagline appear exactly once
 *  across the entire application.
 *
 *  Architecture Notes:
 *  - Pure presentational component.
 *  - No routing or business logic.
 *  - Consumed by Layout.jsx.
 *
 * ============================================================
 */

import holoBadge from "../assets/HoloTap-Badge.png";

export default function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 10
      }}
    >
      <img
        src={holoBadge}
        alt="HoloTap Badge"
        style={{ width: 120, marginBottom: 10 }}
      />

      <h1 style={{ fontSize: "2.2rem", marginBottom: 5 }}>HoloTap</h1>

      <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
        Scan the hologram. Skip the fraud.
      </p>
    </header>
  );
}

