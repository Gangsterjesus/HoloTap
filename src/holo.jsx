// src/holo.jsx

import { useState } from "react";

// -----------------------------
// Consumer Screens (existing)
// -----------------------------
import ConsumerRegistration from "./flows/ConsumerRegistration.jsx";
import ConsumerHome from "./flows/ConsumerHome.jsx";
import ConsumerProcessing from "./flows/ConsumerProcessing.jsx";
import ConsumerPayment from "./components/ConsumerPayment.jsx";


// -----------------------------
// Backend‑Ready Screens (new)
// -----------------------------
import MerchantDashboard from "./components/MerchantDashboard.jsx";   // NEW backend session + QR
// (We will add ConsumerPayment + MerchantConfirm next)

// -----------------------------
// Creator / Merchant / Admin Screens (existing)
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
      // Backend‑Ready Merchant Flow
      // -----------------------------
      case "merchant-dashboard":
        return <MerchantDashboard />;

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
        return <LivePayments setFlow={setScreen} />;

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
        <button className="cta__button" onClick={() => setScreen("merchant-dashboard")}>Merchant Dashboard</button>
        <button className="cta__button" onClick={() => setScreen("identity")}>Identity</button>
        <button className="cta__button" onClick={() => setScreen("merchant-status")}>Merchant Status</button>
        <button className="cta__button" onClick={() => setScreen("admin")}>Admin</button>
        <button className="cta__button" onClick={() => setScreen("live-payments")}>Live Payments</button>
        <button className="cta__button" onClick={() => setScreen("refund-void")}>Refund/Void</button>
      </nav>

      {renderScreen()}
    </div>
  );
}
