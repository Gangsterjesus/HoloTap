/**
 * ============================================================
 *  HoloTap — Global Layout Shell (Layout.jsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the global UI structure for all HoloTap screens,
 *  including header, navigation, and routed content region.
 *  Acts as the parent shell for all React Router routes.
 *
 *  Architecture Notes:
 *  - Uses <Outlet> to render child routes.
 *  - Header and Navigation appear exactly once globally.
 *  - Replaces duplicated headers in legacy Flow1–Flow10 UI.
 *  - Ensures consistent branding across all flows.
 *
 *  Engineering Notes:
 *  - Minimal inline styling; visual design handled in CSS.
 *  - Pure functional component with no state.
 *  - Fully Vite‑compliant and router‑safe.
 *
 * ============================================================
 */


import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";

export default function Layout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--holo-bg)",
        color: "white"
      }}
    >
      <Header />
      <Navigation />

      <main style={{ paddingBottom: 40 }}>
        <Outlet />
      </main>
    </div>
  );
}

