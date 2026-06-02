/**
 * ============================================================
 *  HoloTap — Merchant Router
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 * ============================================================
 *
 *  Purpose:
 *  Handles all merchant‑side routing:
 *    - MerchantHome
 *    - IdentityCard
 *    - LivePayments
 *    - Refund/Void
 *    - MerchantStatus
 *    - AdminDashboard
 *
 * ============================================================
 */

import { useState, useEffect } from "react";

import MerchantHome from "../screens/MerchantHome.jsx";
import IdentityCard from "../flows/IdentityCard.jsx";
import LivePayments from "../flows/LivePayments.jsx";
import RefundVoid from "../flows/RefundVoid.jsx";
import MerchantStatus from "../flows/MerchantStatus.jsx";
import AdminDashboard from "../flows/AdminDashboard.jsx";

import { getUser } from "../services/userService.js";
import { getSession } from "../Utils/Session";

export default function MerchantRouter() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [flow, setFlow] = useState(0);

  useEffect(() => {
    setUser(getUser());
    setSession(getSession());
  }, []);

  // No merchant identity → block
  if (!user || user.role !== "merchant") {
    return <p>Merchant access only.</p>;
  }

  if (!session) {
    return <p>Session expired. Please log in again.</p>;
  }

  // Merchant flow switch
  switch (flow) {
    case 1: return <IdentityCard setFlow={setFlow} />;
    case 2: return <LivePayments setFlow={setFlow} />;
    case 3: return <RefundVoid setFlow={setFlow} />;
    case 4: return <MerchantStatus setFlow={setFlow} />;
    case 5: return <AdminDashboard setFlow={setFlow} />;
    default: return <MerchantHome setFlow={setFlow} />;
  }
}
