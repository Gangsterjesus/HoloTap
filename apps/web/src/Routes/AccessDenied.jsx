/**
 * ============================================================
 *  HoloTap — 403 Access Denied Page (AccessDenied.jsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a branded, user‑friendly 403 Access Denied page for
 *  unauthorised access attempts. Used by ProtectedRoute to
 *  ensure consistent UX across restricted areas.
 *
 *  Architecture Notes:
 *  - Pure presentational component.
 *  - No business logic or routing logic.
 *  - Integrates with global Layout shell automatically.
 *  - Uses HoloTap branding assets (badge, colours, typography).
 *
 *  Engineering Notes:
 *  - Minimal inline styling for layout only.
 *  - Uses <Link> for safe navigation back to home.
 *  - Fully Vite‑compliant; no external dependencies.
 *
 * ============================================================
 */


import holoBadge from "../assets/HoloTap-Badge.png";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: 40,
        paddingBottom: 40,
        maxWidth: 600,
        margin: "0 auto"
      }}
    >
      <img
        src={holoBadge}
        alt="HoloTap Badge"
        style={{ width: 120, marginBottom: 20, opacity: 0.8 }}
      />

      <h1 style={{ fontSize: "2.2rem", marginBottom: 10 }}>403 — Access Denied</h1>

      <p style={{ fontSize: "1.1rem", opacity: 0.85, marginBottom: 20 }}>
        You do not have permission to view this page.
        <br />
        This area is restricted to authorised HoloTap users.
      </p>

      <Link to="/" className="cta__button">
        Return Home
      </Link>
    </div>
  );
}
