/**
 * ============================================================
 *  HoloTap — Web Application Router (Production)
 *  File: HoloTapRouter.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 25 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Central routing layer for the HoloTap Web Application.
 *    Defines all public, creator, and admin routes.
 *    Provides role‑aware navigation and replaces legacy TM352 routing.
 *
 *  Architecture:
 *    - React Router DOM (SPA)
 *    - Navigation persists across all routes
 *    - Role flag controls dashboard visibility (temporary)
 * ============================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

// ------------------------------------------------------------
// SECTION: Public Pages
// ------------------------------------------------------------
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Verify from "./pages/Verify";
import Activate from "./pages/activate"; // Flow 1 — Activation

// ------------------------------------------------------------
// SECTION: Creator Dashboard Pages
// ------------------------------------------------------------
import Dashboard from "./pages/dashboard/Dashboard";
import Payments from "./pages/dashboard/Payments";
import Identity from "./pages/dashboard/Identity";
import Status from "./pages/dashboard/Status";
import Settings from "./pages/dashboard/Settings";

// ------------------------------------------------------------
// SECTION: Admin Tools
// ------------------------------------------------------------
import AdminHome from "./pages/admin/AdminHome";
import Logs from "./pages/admin/Logs";
import Refunds from "./pages/admin/Refunds";
import Live from "./pages/admin/Live";



// ------------------------------------------------------------
// SECTION: Root Router Component
// Engineer Notes:
//   - BrowserRouter wraps the entire SPA
//   - Navigation receives role to determine menu visibility
//   - Routes grouped by subsystem (Public / Creator / Admin)
// ------------------------------------------------------------
export default function HoloTapRouter() {
  // Temporary role until authentication subsystem is implemented
  const role = "creator"; // or "admin"



  // ------------------------------------------------------------
  // SECTION: Render Router
  // Engineer Notes:
  //   - Navigation is persistent across all routes
  //   - Activation route added for Flow 1
  //   - Dashboard routes grouped for clarity
  // ------------------------------------------------------------
  return (
    <BrowserRouter>
      <Navigation role={role} />

      <Routes>

        {/* --------------------------------------------------------
            PUBLIC ROUTES
            Accessible without authentication.
            Includes activation (Flow 1).
        -------------------------------------------------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/activate" element={<Activate />} />


        {/* --------------------------------------------------------
            CREATOR ROUTES
            Requires creator role (temporary role flag).
            Dashboard + payments + identity + status + settings.
        -------------------------------------------------------- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/status" element={<Status />} />
        <Route path="/settings" element={<Settings />} />


        {/* --------------------------------------------------------
            ADMIN ROUTES
            Requires admin role (temporary role flag).
            Logs + refunds + live monitoring.
        -------------------------------------------------------- */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/logs" element={<Logs />} />
        <Route path="/admin/refunds" element={<Refunds />} />
        <Route path="/admin/live" element={<Live />} />

      </Routes>
    </BrowserRouter>
  );
}
