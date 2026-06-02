/**
 * ============================================================
 *  HoloTap — Global Application Router
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 * ============================================================
 *
 *  Purpose:
 *  Delegates routing to ConsumerRouter or MerchantRouter based
 *  on stored user identity. This file contains no UI logic.
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { getUser } from "./services/userService";
import { getSession } from "./Utils/Session";

import ConsumerRouter from "./Routers/ConsumerRouter.js";
import MerchantRouter from "./Routers/MerchantRouter.jsx";

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setUser(getUser());
    setSession(getSession());
  }, []);

  // No user → consumer onboarding
  if (!user) return <ConsumerRouter />;

  // No session → consumer login
  if (!session) return <ConsumerRouter />;

  // Merchant role → merchant router
  if (user.role === "merchant") return <MerchantRouter />;

  // Default → consumer router
  return <ConsumerRouter />;
}

