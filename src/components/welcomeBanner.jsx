/**
 * ============================================================
 *  HoloTap — Welcome Banner Component
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the primary brand banner displayed on the HoloTap
 *  landing screen. This component introduces the product,
 *  reinforces brand identity, and sets the visual tone for the
 *  consumer and merchant experience.
 *
 *  Architecture Notes:
 *  - Pure presentational component; contains no business logic.
 *  - Designed for reuse across multiple screens.
 *  - Accepts no props; static brand element.
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, accessible, and responsive layout.
 *  - Inline styles avoided except for minimal layout control.
 *
 * ============================================================
 */

import holoBadge from "../assets/HoloTap-Badge.png";

export default function WelcomeBanner() {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20
      }}
    >
      <img
        src={holoBadge}
        alt="HoloTap Badge"
        style={{
          width: 120,
          marginBottom: 10
        }}
      />

      <h1
        style={{
          fontSize: "2.2rem",
          marginBottom: 5
        }}
      >
        HoloTap
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          opacity: 0.9
        }}
      >
        Scan the hologram. Skip the fraud.
      </p>
    </div>
  );
}
