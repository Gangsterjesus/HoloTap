/**
 * ============================================================
 *  HoloTap — Creator Navigation Surface
 *  File: src/components/navigation/NavigationCreator.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui (creator)
 *  Revision: v2 — Unified Architecture
 * ============================================================
 */

import { NavLink } from "react-router-dom";

const LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Payments", to: "/payments" },
  { label: "Identity", to: "/identity" },
  { label: "Status", to: "/status" },
  { label: "Settings", to: "/settings" },
];

export default function NavigationCreator() {
  return (
    <nav className="w-full bg-holotap-primary text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="text-xl font-bold tracking-wide">HoloTap</div>

        <ul className="flex gap-6 text-sm flex-wrap">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-holotap-accent font-semibold border-b-2 border-holotap-accent pb-1 transition"
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
