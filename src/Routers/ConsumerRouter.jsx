/**
 * ============================================================
 *  HoloTap — Consumer Router
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 * ============================================================
 *
 *  Purpose:
 *  Handles all consumer‑side routing:
 *    - Registration
 *    - Login
 *    - Home
 *    - Payments
 *    - Wallet
 *    - Settings
 *
 * ============================================================
 */

import { useState, useEffect } from "react";

import ConsumerRegistration from "../flows/ConsumerRegistration.jsx";
import ConsumerLogin from "../flows/ConsumerLogin.jsx";
import ConsumerHome from "../screens/ConsumerHome.jsx";

import { getUser } from "../services/userService.js";
import { getSession } from "../Utils/Session";

export default function ConsumerRouter() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setUser(getUser());
    setSession(getSession());
  }, []);

  // No user → registration
  if (!user) {
    return (
      <ConsumerRegistration
        onComplete={() => setUser(getUser())}
      />
    );
  }

  // User exists but no session → login
  if (!session) {
    return (
      <ConsumerLogin
        onComplete={() => setSession(getSession())}
        onRegister={() => {
          localStorage.removeItem("ht_user");
          setUser(null);
        }}
      />
    );
  }

  // Logged‑in consumer → home
  return <ConsumerHome />;
}
