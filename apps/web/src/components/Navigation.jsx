/**
 * ============================================================
 *  HoloTap — Navigation Component (Upgraded Production Version)
 *  File: src/components/Navigation.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides role‑aware navigation for the HoloTap web application.
 *  Uses a config‑driven structure, semantic markup, active‑link
 *  highlighting, and mobile‑responsive layout.
 *
 *  Roles supported:
 *  - public
 *  - creator
 *  - admin
 *
 *  Styling:
 *  - All styles moved to Navigation.module.css
 *  - No inline styles
 * ============================================================
 */

import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

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
  { label: "System Status", to: "/admin/status" },
  { label: "Organisations", to: "/admin/organisations" },
  { label: "Users", to: "/admin/users" },
],
};

/* ============================
   COMPONENT
   ============================ */

export default function Navigation({ role = "public" }) {
  const links = navConfig[role] || navConfig.public;

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <div className={styles.logo}>HoloTap</div>

      {/* Navigation Links */}
      <ul className={styles.menu}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
