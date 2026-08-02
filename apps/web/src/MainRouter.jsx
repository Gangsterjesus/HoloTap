/* ============================================================
   HoloTap — Engineering Build System
   File: src/MainRouter.jsx
   Author: Raymond Newton
   Project: HoloTap Identity & QR Security Platform
   Layer: web-ui
   Revision: v2 — Unified Web & Mobile Architecture
   ------------------------------------------------------------
   Notes:
   - Deterministic architecture only
   - Zero template styling, zero boilerplate
   - Tailwind v4 CSS-first UI pipeline
   - Web UI must remain modular and stateless
   - Identity, QR, and organisation layers isolated
   - Explicit state transitions; no hidden side-effects
   ============================================================ */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";

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

/* ============================
   COMMUNICATION LAYER (v1)
   ============================ */
import Updater from "./pages/Updater.jsx";
import Enquiries from "./pages/Enquiries.jsx";
import Admin from "./pages/Admin.jsx";
import Support from "./pages/Support.jsx";
import Dev from "./pages/Dev.jsx";


export default function MainRouter() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<UnderConstruction />} />
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

        {/* COMMUNICATION LAYER */}
        <Route path="/updater" element={<Updater />} />
        <Route path="/enquiries" element={<Enquiries />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/support" element={<Support />} />
        <Route path="/dev" element={<Dev />} />

      </Routes>
    </BrowserRouter>
  );
}
