/**
 * ============================================================
 *  HoloTap — Welcome Banner Component (Header‑Safe Version)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the landing‑page hero section WITHOUT duplicating
 *  the global header. This component now focuses solely on the
 *  introductory message and visual spacing for the home screen.
 *
 *  Architecture Notes:
 *  - Header elements (badge, title, tagline) removed to avoid
 *    duplication with the global header in Holo.jsx.
 *  - Pure presentational component; no business logic.
 *  - Designed for reuse across multiple screens.
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - Clean, accessible, and responsive layout.
 *  - Inline styles kept minimal and controlled.
 *
 * ============================================================
 */

export default function WelcomeBanner() {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 20,
        maxWidth: 600,
        margin: "0 auto"
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          marginBottom: 10
        }}
      >
        Why HoloTap?
      </h2>

      <p
        style={{
          fontSize: "1.1rem",
          opacity: 0.9,
          lineHeight: 1.5
        }}
      >
        Holographic QR and account‑to‑account payments.
        <br />
        Secure, fraud‑resistant, and built for creators,
        merchants, and consumers.
      </p>
    </div>
  );
}
