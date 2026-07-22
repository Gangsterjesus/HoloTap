/**
 * ============================================================
 *  HoloTap — Router Root (App Shell)
 *  File: src/Holo.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  The root-level application shell for the HoloTap web platform.
 *  Provides:
 *    - Global navigation
 *    - Role-aware routing
 *    - Public pages
 *    - Creator dashboard pages
 *    - Admin pages
 *
 *  This file defines the entire route map for the web app.
 * ============================================================
 */

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import { useAuth } from "./services/AuthContext.jsx";

/* ============================
   PUBLIC PAGES
   ============================ */
import Home from "./pages/Home.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Verify from "./pages/Verify.jsx";

/* ============================
   CREATOR DASHBOARD PAGES
   ============================ */
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Payments from "./pages/dashboard/Payments.jsx";
import Identity from "./pages/dashboard/Identity.jsx";
import Status from "./pages/dashboard/Status.jsx";
import Settings from "./pages/dashboard/Settings.jsx";

/* ============================
   ADMIN PAGES
   ============================ */
import AdminHome from "./pages/admin/AdminHome.jsx";
import Logs from "./pages/admin/Logs.jsx";
import Refunds from "./pages/admin/Refunds.jsx";
import Live from "./pages/admin/Live.jsx";

/* ============================
   COMPONENT
   ============================ */

export default function Holo() {
  const { role } = useAuth();

  return (
    <div className="holo-app">

      {/* ============================
          GLOBAL NAVIGATION
          ============================ */}
      <Navigation role={role} />

      {/* ============================
          ROUTE MAP
          ============================ */}
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/verify" element={<Verify />} />

        {/* CREATOR ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/identity" element={<Identity />} />
        <Route path="/status" element={<Status />} />
        <Route path="/settings" element={<Settings />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/logs" element={<Logs />} />
        <Route path="/admin/refunds" element={<Refunds />} />
        <Route path="/admin/live" element={<Live />} />

      </Routes>
    </div>
  );
}
