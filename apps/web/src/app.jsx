/**
 * ============================================================
 *  HoloTap — Application Wrapper
 *  File: src/App.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Wraps the entire HoloTap application with global providers,
 *  layout structure, and the main router (Holo.jsx).
 *
 *  Responsibilities:
 *  - Provide global CSS
 *  - Provide global context (future expansion)
 *  - Render the router root (Holo.jsx)
 * ============================================================
 */

import "./index.css";
import Holo from "./Holo.jsx";

/* ============================
   COMPONENT
   ============================ */

export default function App() {
  return (
    <div className="app-shell">

      {/* ============================
          ROUTER ROOT
          ============================ */}
      <Holo role="public" />

    </div>
  );
}
