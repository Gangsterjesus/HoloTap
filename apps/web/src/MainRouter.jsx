/**
 * ============================================================
 *  HoloTap — Unified Application Router (Production)
 *  File: src/MainRouter.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 27 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    The single, unified router for the HoloTap Web Platform.
 *
 *  Architecture:
 *    - React Router DOM (SPA)
 *    - Public pages
 *    - Auth pages
 *    - Organisation workspace (.org)
 *    - Admin workspace
 *    - Merchant workspace
 *    - QR flows
 *    - Payment result
 *
 *  Notes:
 *    - All creator terminology removed permanently.
 *    - Legacy TM352 routers removed.
 * ============================================================
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";

/* ============================
   PUBLIC PAGES
   ============================ */
import Home from "./pages/public/Home.jsx";
import Onboarding from "./pages/public/Onboarding.jsx";
import Verify from "./pages/public/Verify.jsx";

/* ============================
   AUTH PAGES
   ============================ */
import Login from "./pages/auth/Login.jsx";
import MagicLink from "./pages/auth/MagicLink.jsx";
import Passkey from "./pages/auth/Passkey.jsx";
import VerifyAuth from "./pages/auth/VerifyAuth.jsx";

/* ============================
   ORG WORKSPACE (.org)
   ============================ */
import OrgHome from "./pages/org/Home.jsx";
import OrgMembers from "./pages/org/Members.jsx";
import OrgRoles from "./pages/org/Roles.jsx";
import OrgSettings from "./pages/org/Settings.jsx";
import OrgActivity from "./pages/org/Activity.jsx";

/* ============================
   ADMIN WORKSPACE
   ============================ */
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminMerchants from "./pages/admin/Merchants.jsx";
import AdminLogs from "./pages/admin/Logs.jsx";
import AdminSystemStatus from "./pages/admin/SystemStatus.jsx";
import AdminOrganisations from "./pages/admin/Organisations.jsx";
import AdminUsers from "./pages/admin/Users.jsx";

/* ============================
   MERCHANT WORKSPACE
   ============================ */
import MerchantHome from "./pages/merchant/Home.jsx";

/* ============================
   QR FLOWS
   ============================ */
import Activate from "./pages/qr/Activate.jsx";
import Scan from "./pages/qr/Scan.jsx";

/* ============================
   PAYMENT RESULT
   ============================ */
import PaymentResult from "./pages/payment/Result.jsx";


export default function MainRouter() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/verify" element={<Verify />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/magic" element={<MagicLink />} />
        <Route path="/passkey" element={<Passkey />} />
        <Route path="/auth/verify" element={<VerifyAuth />} />

        {/* ORG WORKSPACE */}
        <Route path="/org" element={<OrgHome />} />
        <Route path="/org/members" element={<OrgMembers />} />
        <Route path="/org/roles" element={<OrgRoles />} />
        <Route path="/org/settings" element={<OrgSettings />} />
        <Route path="/org/activity" element={<OrgActivity />} />

        {/* ADMIN WORKSPACE */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/merchants" element={<AdminMerchants />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/system" element={<AdminSystemStatus />} />
        <Route path="/admin/orgs" element={<AdminOrganisations />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* MERCHANT WORKSPACE */}
        <Route path="/merchant" element={<MerchantHome />} />

        {/* QR FLOWS */}
        <Route path="/activate" element={<Activate />} />
        <Route path="/scan" element={<Scan />} />

        {/* PAYMENT RESULT */}
        <Route path="/payment/result" element={<PaymentResult />} />

      </Routes>
    </BrowserRouter>
  );
}
