/**
 * ============================================================
 *  HoloTap — Badge Component
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a reusable badge element for displaying contributor
 *  tiers, labels, or status indicators across the HoloTap
 *  interface. Each badge may include an icon and a tier-based
 *  visual variant.
 *
 *  Architecture Notes:
 *  - Pure presentational component.
 *  - Accepts explicit props for label, icon, and tier.
 *  - Tier value is used to generate a variant class name.
 *  - Designed for reuse across creator feeds, dashboards,
 *    profile cards, and promotional sections.
 *
 *  Engineering Notes:
 *  - Fully Vite-compliant and production-ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, accessible, mobile-friendly layout.
 *  - Uses explicit class names for styling consistency.
 *
 * ============================================================
 */

import React from "react";
import "./Badge.css";

export default function Badge({ label, icon, tier }) {
  return (
    <div className={`badge badge-${tier}`}>
      {icon && (
        <img
          src={icon}
          alt={`${label} icon`}
          className="badge-icon"
        />
      )}

      <span className="badge-label">{label}</span>
    </div>
  );
}
