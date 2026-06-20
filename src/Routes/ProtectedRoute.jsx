/**
 * ============================================================
 *  HoloTap — Protected Route Wrapper (ProtectedRoute.jsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Enforces role‑based access control for restricted frontend
 *  routes. Ensures that only authorised users (merchant/admin)
 *  can access protected areas of the application.
 *
 *  Architecture Notes:
 *  - Wraps protected routes using React Router v6.
 *  - Redirects unauthorised users to the branded 403 page.
 *  - Validates both user identity and active session.
 *  - Integrates with AppRouter for identity initialisation.
 *
 *  Engineering Notes:
 *  - Uses getUser() and getSession() for identity retrieval.
 *  - Redirects use <Navigate> with replace to avoid history
 *    pollution.
 *  - Supports future multi‑role expansion (e.g., ["merchant",
 *    "admin"]).
 *  - Fully Vite‑compliant and side‑effect free.
 *
 * ============================================================
 */


import { Navigate } from "react-router-dom";
import { getUser } from "../services/userService";
import { getSession } from "../Utils/Session";

export default function ProtectedRoute({ role, children }) {
  const user = getUser();
  const session = getSession();

  // Not logged in → send to registration
  if (!user) return <Navigate to="/register" replace />;

  // No session → send to consumer home/login
  if (!session) return <Navigate to="/consumer" replace />;

  // Role mismatch → send to home
  if (role && user.role !== role) {
   return <Navigate to="/403" replace />;

  }

  return children;
}
