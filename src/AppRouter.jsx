/**
 * ============================================================
 *  HoloTap — Global Application Router (AppRouter.jsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides identity‑aware entry routing for the HoloTap
 *  application. Determines initial redirect based on stored
 *  user identity and active session, then delegates all UI
 *  routing to Holo.jsx.
 *
 *  Architecture Notes:
 *  - Replaces legacy ConsumerRouter/MerchantRouter system.
 *  - Uses getUser() and getSession() for identity retrieval.
 *  - Redirects unauthenticated users to registration.
 *  - Redirects merchants to merchant dashboard.
 *  - Loads the full React Router shell (Holo.jsx) for all
 *    authenticated users.
 *
 *  Engineering Notes:
 *  - Uses <Navigate> for clean redirect behaviour.
 *  - Includes loading state to avoid flicker during identity
 *    initialisation.
 *  - Fully Vite‑compliant and TM470‑ready.
 *
 * ============================================================
 */


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getUser } from "./services/userService";
import { getSession } from "./utils/Session.js";

import Holo from "./Holo.jsx";

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getUser());
    setSession(getSession());
    setLoading(false);
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading…</p>;
  }

  // No user → send to registration
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // User exists but no session → send to consumer login/home
  if (!session) {
    return <Navigate to="/consumer" replace />;
  }

  // Merchant role → send to merchant dashboard
  if (user.role === "merchant") {
    return <Navigate to="/merchant" replace />;
  }

  // Default → load full React Router shell
  return <Holo />;
}

