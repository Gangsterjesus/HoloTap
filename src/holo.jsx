/**
 * ============================================================
 *  HoloTap — Frontend Application Router (Holo.jsx)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Centralised UI router for all HoloTap frontend flows.
 *  Provides controlled navigation between consumer, merchant,
 *  and administrative screens. Integrates backend‑ready flows
 *  including merchant session creation, consumer payment entry,
 *  and merchant confirmation.
 *
 *  Architecture Notes:
 *  - Replaces legacy Flow1–Flow10 architecture.
 *  - Uses explicit screen state rather than nested routers.
 *  - Backend‑ready screens include:
 *        • MerchantDashboard (session + QR)
 *        • ConsumerPayment (payment creation)
 *        • MerchantConfirm (payment approval)
 *  - Maintains TM352 compatibility for assessment flows.
 *  - Stores backend identifiers in component state:
 *        • sessionId (merchant session)
 *        • paymentId (consumer payment)
 *
 *  Engineering Notes:
 *  - All imports validated for existence and case‑sensitivity.
 *  - No deprecated components or dead routes remain.
 *  - Fully Vite‑compliant; no unresolved imports.
 *  - Designed for incremental backend expansion.
 *
 * ============================================================
 */

import { useState } from "react";

// -----------------------------
// Consumer Screens
// -----------------------------
import ConsumerRegistration from "./flows/ConsumerRegistration.jsx";
import ConsumerHome from "./flows/ConsumerHome.jsx";
import ConsumerProcessing from "./flows/ConsumerProcessing.jsx";

// -----------------------------
// Backend‑Ready Screens
// -----------------------------
import MerchantDashboard from "./components/merchantDashboard.jsx";
import ConsumerPayment from "./components/consumerPayment.jsx";
import MerchantConfirm from "./components/MerchantConfirm.jsx";

// -----------------------------
// Existing Merchant/Admin Screens
// -----------------------------
import MerchantStatus from "./flows/MerchantStatus.jsx";
import AdminDashboard from "./flows/AdminDashboard.jsx";
import IdentityCard from "./flows/IdentityCard.jsx";
import LivePayments from "./flows/LivePayments.jsx";
import RefundVoid from "./flows/RefundVoid.jsx";

// -----------------------------
// Landing Components
// -----------------------------
import WelcomeBanner from "./components/WelcomeBanner.jsx";
import Feature from "./components/Feature.jsx";
import holoBadge from "./assets/HoloTap-Badge.png";

export default function Holo() {
  const [screen, setScreen] = useState("home");

  // Backend flow state
  const [sessionId, setSessionId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  const renderScreen = () => {
    switch (screen) {
      // -----------------------------
      // Consumer Flows
      // -----------------------------
      case "register":
        return (
          <ConsumerRegistration
            onComplete={() => setScreen("consumer-home")}
          />
        );

      case "consumer-home":
        return <ConsumerHome setFlow={setScreen} />;

      case "processing":
        return <ConsumerProcessing setFlow={setScreen} />;

      // -----------------------------
      // Backend Consumer Payment Flow
      // -----------------------------
      case "consumer-payment":
        return (
          <ConsumerPayment
            sessionId={sessionId}
            onProcessing={(pid) => {
              setPaymentId(pid);
              setScreen("processing");
            }}
          />
        );

      // -----------------------------
      // Backend Merchant Flow
      // -----------------------------
      case "merchant-dashboard":
        return (
          <MerchantDashboard
            onSession={(sid) => {
              setSessionId(sid);
              setScreen("merchant-status");
            }}
          />
        );

      case "merchant-confirm":
        return (
          <MerchantConfirm
            paymentId={paymentId}
            onComplete={() => setScreen("merchant-status")}
          />
        );

      // -----------------------------
      // Existing Merchant/Admin Screens
      // -----------------------------
      case "merchant-status":
        return <MerchantStatus setFlow={setScreen} />;

      case "admin":
        return <AdminDashboard setFlow={setScreen} />;

      case "identity":
        return <IdentityCard setFlow={setScreen} />;

      case "live-payments":
        return (
          <LivePayments
            onSelectPayment={(pid) => {
              setPaymentId(pid);
              setScreen("merchant-confirm");
            }}
          />
        );

      case "refund-void":
        return <RefundVoid setFlow={setScreen} />;

      // -----------------------------
      // Default Landing Page
      // -----------------------------
      default:
        return (
          <>
            <WelcomeBanner />
            <Feature />

            <div className="cta">
              <button className="cta__button" onClick={() => setScreen("register")}>
                Consumer Registration
              </button>

              <button className="cta__button" onClick={() => setScreen("consumer-home")}>
                Consumer Home
              </button>

              <button className="cta__button" onClick={() => setScreen("merchant-dashboard")}>
                Merchant Dashboard (Backend)
              </button>

              <button className="cta__button" onClick={() => setScreen("admin")}>
                Admin Dashboard
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--holo-bg)", color: "white" }}>
      <header className="header" style={{ textAlign: "center", paddingTop: 20 }}>
        <img
          src={holoBadge}
          alt="HoloTap Badge"
          style={{ width: 120, marginBottom: 10 }}
        />
        <h1 className="header__title">HoloTap</h1>
        <p className="header__tagline">Scan the hologram. Skip the fraud.</p>
      </header>

      <nav
        className="flow-nav"
        style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}
      >
        <button className="cta__button" onClick={() => setScreen("home")}>Home</button>
        <button className="cta__button" onClick={() => setScreen("register")}>Register</button>
        <button className="cta__button" onClick={() => setScreen("consumer-home")}>Consumer Home</button>
        <button className="cta__button" onClick={() => setScreen("consumer-payment")}>Consumer Payment</button>
        <button className="cta__button" onClick={() => setScreen("merchant-dashboard")}>Merchant Dashboard</button>
        <button className="cta__button" onClick={() => setScreen("merchant-status")}>Merchant Status</button>
        <button className="cta__button" onClick={() => setScreen("merchant-confirm")}>Merchant Confirm</button>
        <button className="cta__button" onClick={() => setScreen("identity")}>Identity</button>
        <button className="cta__button" onClick={() => setScreen("admin")}>Admin</button>
        <button className="cta__button" onClick={() => setScreen("live-payments")}>Live Payments</button>
        <button className="cta__button" onClick={() => setScreen("refund-void")}>Refund/Void</button>
      </nav>

      {renderScreen()}
    </div>
  );
}

