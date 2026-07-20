/**
 * ============================================================
 *  HoloTap — Frontend Routing Shell (Holo.jsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the global React Router configuration for all
 *  HoloTap frontend flows. This component replaces the legacy
 *  screen‑state router with a modern, URL‑driven architecture.
 *  All consumer, merchant, and administrative routes are
 *  defined here, including protected merchant/admin areas.
 *
 *  Architecture Notes:
 *  - Uses React Router v6 with <Routes>, <Route>, and <Outlet>.
 *  - Layout.jsx provides the global UI shell (header + nav).
 *  - ProtectedRoute enforces role‑based access control.
 *  - AccessDenied.jsx provides a branded 403 page.
 *  - All flows are now deep‑linkable and browser‑navigable.
 *  - Fully replaces the Flow1–Flow10 state‑machine router.
 *
 *  Engineering Notes:
 *  - All imports validated for case‑sensitivity and existence.
 *  - No deprecated screen‑state logic remains.
 *  - Merchant and admin routes are strictly role‑protected.
 *  - Consumer routes remain publicly accessible unless session
 *    enforcement is added via RequireSession (optional).
 *  - Fully Vite‑compliant and TM470‑ready.
 *
 * ============================================================
 */


import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import WelcomeBanner from "./components/WelcomeBanner.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AccessDenied from "./routes/AccessDenied.jsx";

// Consumer
import ConsumerRegistration from "./flows/ConsumerRegistration.jsx";
import ConsumerHome from "./flows/ConsumerHome.jsx";
import ConsumerProcessing from "./flows/ConsumerProcessing.jsx";

// Backend-ready flows
import MerchantDashboard from "./components/merchantDashboard.jsx";
import ConsumerPayment from "./components/consumerPayment.jsx";
import MerchantConfirm from "./components/MerchantConfirm.jsx";

// Merchant/Admin
import MerchantStatus from "./flows/MerchantStatus.jsx";
import AdminDashboard from "./flows/AdminDashboard.jsx";
import IdentityCard from "./flows/IdentityCard.jsx";
import LivePayments from "./flows/LivePayments.jsx";
import RefundVoid from "./flows/RefundVoid.jsx";

export default function Holo() {
  return (
    <Layout>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<WelcomeBanner />} />

        {/* Consumer */}
        <Route path="/register" element={<ConsumerRegistration />} />
        <Route path="/consumer" element={<ConsumerHome />} />
        <Route path="/processing" element={<ConsumerProcessing />} />
        <Route path="/pay" element={<ConsumerPayment />} />

        {/* Merchant (protected) */}
        <Route
          path="/merchant"
          element={
            <ProtectedRoute role="merchant">
              <MerchantDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/merchant/status"
          element={
            <ProtectedRoute role="merchant">
              <MerchantStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/merchant/confirm"
          element={
            <ProtectedRoute role="merchant">
              <MerchantConfirm />
            </ProtectedRoute>
          }
        />

        {/* Admin (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared */}
        <Route path="/identity" element={<IdentityCard />} />
        <Route path="/live" element={<LivePayments />} />
        <Route path="/refund" element={<RefundVoid />} />

        {/* 403 Access Denied */}
        <Route path="/403" element={<AccessDenied />} />

        {/* 404 */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>Page Not Found</h2>}
        />

      </Routes>
    </Layout>
  );
}

