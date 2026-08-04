/**
 * ============================================================
 *  HoloTap — Global Navigation Router
 *  File: src/components/Navigation.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Layer: web-ui
 *  Revision: v2 — Unified Web & Mobile Architecture
 *  ------------------------------------------------------------
 *  Notes:
 *  - Deterministic architecture only
 *  - Stateless, modular, zero boilerplate
 *  - Tailwind v4 CSS-first UI pipeline
 *  - Role-based navigation isolation
 *  - Async-ready for bundle optimisation
 * ============================================================
 */

import { lazy, Suspense } from "react";

/* ============================
   LAZY-LOADED ROLE NAVIGATION
   ============================ */

const NavigationPublic = lazy(() =>
  import("./navigation/NavigationPublic.jsx")
);

const NavigationCreator = lazy(() =>
  import("./navigation/NavigationCreator.jsx")
);

const NavigationAdmin = lazy(() =>
  import("./navigation/NavigationAdmin.jsx")
);

/* ============================
   COMPONENT
   ============================ */

export default function Navigation({ role = "public" }) {
  return (
    <Suspense fallback={<div />}>
      {role === "public" && <NavigationPublic />}
      {role === "creator" && <NavigationCreator />}
      {role === "admin" && <NavigationAdmin />}
    </Suspense>
  );
}
