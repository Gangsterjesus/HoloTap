/* ============================================================
   HoloTap — Engineering Build System
   File: src/components/Navigation.jsx
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

import { NavLink } from "react-router-dom";

/* ============================
   NAVIGATION CONFIG
   ============================ */

const navConfig = {
  public: [
    { label: "Home", to: "/" },
    { label: "Onboarding", to: "/onboarding" },
    { label: "Verify", to: "/verify" },
  ],

  creator: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Payments", to: "/payments" },
    { label: "Identity", to: "/identity" },
    { label: "Status", to: "/status" },
    { label: "Settings", to: "/settings" },
  ],

  admin: [
    { label: "Admin Dashboard", to: "/admin" },
    { label: "Merchants", to: "/admin/merchants" },
    { label: "System Logs", to: "/admin/logs" },
    { label: "System Status", to: "/admin/system" },
    { label: "Organisations", to: "/admin/orgs" },
    { label: "Users", to: "/admin/users" },
  ],
};

/* ============================
   COMPONENT
   ============================ */

export default function Navigation({ role = "public" }) {
  const links = navConfig[role] || navConfig.public;

  return (
    <nav className="w-full bg-holotap-primary text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          HoloTap
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-holotap-accent font-semibold transition"
                    : "text-white hover:text-holotap-accent transition"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
}
