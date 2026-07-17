/**
 * ============================================================
 *  HoloTap — Application Router (React Router v6)
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 * ============================================================
 *
 *  Purpose:
 *  Centralised routing for the entire HoloTap SPA:
 *    - Consumer flows
 *    - Merchant flows
 *    - Admin flows (optional)
 *    - Protected routes
 *    - Dynamic payment routes
 *
 *  Architecture Notes:
 *  - Replaces legacy Flow-based routers.
 *  - Uses ProtectedRoute for role-based access control.
 *  - Fully Vite + React Router v6 compliant.
 *  - TM470-ready, production-grade.
 *
 * ============================================================
 */

import { Routes, Route } from "react-router-dom";
import { getSession } from "../utils/Session.js";

const session = getSession();



// Consumer Screens
import ConsumerRegistration from "../flows/ConsumerRegistration.jsx";
import ConsumerLogin from "../flows/ConsumerLogin.jsx";
import ConsumerHome from "../screens/ConsumerHome.jsx";
import ConsumerPayment from "../flows/ConsumerPayment.jsx";
import ConsumerProcessing from "../flows/ConsumerProcessing.jsx";
import ConsumerConfirm from "../flows/ConsumerConfirm.jsx";

// Merchant Screens
import MerchantDashboard from "../flows/MerchantDashboard.jsx";
import MerchantStatus from "../flows/MerchantStatus.jsx";
import LivePayments from "../flows/LivePayments.jsx";
import RefundVoid from "../flows/RefundVoid.jsx";
import IdentityCard from "../flows/IdentityCard.jsx";
import AdminDashboard from "../flows/AdminDashboard.jsx";
import MerchantConfirm from "../flows/MerchantConfirm.jsx";

// Shared
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function AppRouter() {
  return (
    <Routes>

      {/** ============================
           CONSUMER ROUTES
          ============================ */}
      <Route path="/register" element={<ConsumerRegistration />} />
      <Route path="/login" element={<ConsumerLogin />} />

      <Route
        path="/consumer"
        element={
          <ProtectedRoute role="consumer">
            <ConsumerHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pay"
        element={
          <ProtectedRoute role="consumer">
            <ConsumerPayment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/processing/:paymentId"
        element={
          <ProtectedRoute role="consumer">
            <ConsumerProcessing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/confirm/:paymentId"
        element={
          <ProtectedRoute role="consumer">
            <ConsumerConfirm />
          </ProtectedRoute>
        }
      />

      {/** ============================
           MERCHANT ROUTES
          ============================ */}
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
        path="/live"
        element={
          <ProtectedRoute role="merchant">
            <LivePayments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/refund"
        element={
          <ProtectedRoute role="merchant">
            <RefundVoid />
          </ProtectedRoute>
        }
      />

      <Route
        path="/identity"
        element={
          <ProtectedRoute role="merchant">
            <IdentityCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="merchant">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/merchant/confirm/:paymentId"
        element={
          <ProtectedRoute role="merchant">
            <MerchantConfirm />
          </ProtectedRoute>
        }
      />

      {/** ============================
           DEFAULT FALLBACK
          ============================ */}
      <Route path="*" element={<ConsumerLogin />} />

    </Routes>
  );
}
