/**
 * ============================================================
 *  HoloTap — Web Application Router (Production)
 *  File: HoloTapRouter.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Defines all production routes for the HoloTap web application.
 *  Handles public pages, creator dashboard, and admin tools.
 *  This replaces all legacy TM352 routing systems.
 * ============================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

// Public pages
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Verify from "./pages/Verify";

// Creator dashboard
import Dashboard from "./pages/dashboard/Dashboard";
import Payments from "./pages/dashboard/Payments";
import Identity from "./pages/dashboard/Identity";
import Status from "./pages/dashboard/Status";
import Settings from "./pages/dashboard/Settings";

// Admin tools
import AdminHome from "./pages/admin/AdminHome";
import Logs from "./pages/admin/Logs";
import Refunds from "./pages/admin/Refunds";
import Live from "./pages/admin/Live";

export default function HoloTapRouter() {
  // Temporary role until auth is implemented
  const role = "creator"; // or "admin"

  return (
    <BrowserRouter>
      <Navigation role={role} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/verify" element={<Verify />} />

        {/* Creator */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/status" element={<Status />} />
        <Route path="/settings" element={<Settings />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/logs" element={<Logs />} />
        <Route path="/admin/refunds" element={<Refunds />} />
        <Route path="/admin/live" element={<Live />} />
      </Routes>
    </BrowserRouter>
  );
}
