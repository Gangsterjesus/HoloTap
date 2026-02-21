import { useState } from "react";

// Landing Components
import WelcomeBanner from "./components/WelcomeBanner.jsx";
import Feature from "./components/Feature.jsx";
import holoBadge from "./assets/HoloTap-Badge.png";
// Flow Screens

import Flow1Registration from "./flows/Flow1Registration.jsx";
import Flow2ReturningUser from "./flows/Flow2ReturningUser.jsx";
import Flow3Payment from "./flows/Flow3Payment.jsx";
import Flow4Confirmation from "./flows/Flow4Confirmation.jsx";
import Flow5CreatorDashboard from "./flows/Flow5CreatorDashboard.jsx";
import Flow6IdentityCard from "./flows/Flow6IdentityCard.jsx";
import Flow7Processing from "./flows/Flow7processing.jsx";
import Flow8MerchantStatus from "./flows/Flow8MerchantStatus.jsx";
import Flow9Logging from "./flows/Flow9Logging.jsx";
import Flow10AdminDashboard from "./flows/Flow10AdminDashboard.jsx";

export default function Holo() {
  const [flow, setFlow] = useState(0);

 const renderFlow = () => {
  switch (flow) {
    case 1:
      return <Flow1Registration setFlow={setFlow} />;
    case 2:
      return <Flow2ReturningUser setFlow={setFlow} />;
    case 3:
      return <Flow3Payment setFlow={setFlow} />;
    case 4:
      return <Flow4Confirmation setFlow={setFlow} />;
    case 5:
      return <Flow5CreatorDashboard setFlow={setFlow} />;
    case 6:
      return <Flow6IdentityCard setFlow={setFlow} />;
    case 7:
      return <Flow7Processing setFlow={setFlow} />;
    case 8:
      return <Flow8MerchantStatus setFlow={setFlow} />;
    case 9:
      return <Flow9Logging setFlow={setFlow} />;
    case 10:
      return <Flow10AdminDashboard setFlow={setFlow} />;

    default:
      return (
        <>
          <WelcomeBanner />
          <Feature />

          <div className="cta">
            <button className="cta__button" onClick={() => setFlow(1)}>
              Start Registration (Flow 1)
            </button>
            <button className="cta__button" onClick={() => setFlow(2)}>
              Returning User (Flow 2)
            </button>
          </div>
        </>
      );
  }
};

  return (
    <div style={{ minHeight: "100vh", background: "var(--holo-bg)", color: "white" }}>

      {/* Header with Badge */}
      <header className="header" style={{ textAlign: "center", paddingTop: 20 }}>
        <img
          src={holoBadge}
          alt="HoloTap Badge"
          style={{ width: 120, marginBottom: 10 }}
        />
        <h1 className="header__title">HoloTap</h1>
        <p className="header__tagline">Scan the hologram. Skip the fraud.</p>
      </header>

      {/* Navigation */}
      <nav
        className="flow-nav"
        style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}
      >
        <button className="cta__button" onClick={() => setFlow(0)}>Home</button>
        <button className="cta__button" onClick={() => setFlow(1)}>Flow 1 — Registration</button>
        <button className="cta__button" onClick={() => setFlow(2)}>Flow 2 — Returning User</button>
        <button className="cta__button" onClick={() => setFlow(3)}>Flow 3 — Payment</button>
        <button className="cta__button" onClick={() => setFlow(4)}>Flow 4 — Confirmation</button>
        <button className="cta__button" onClick={() => setFlow(5)}>Flow 5 — Creator Dashboard</button>
        <button className="cta__button" onClick={() => setFlow(6)}>Flow 6 — Identity Card</button>
        <button className="cta__button" onClick={() => setFlow(7)}>Flow 7 — Processing</button>
        <button className="cta__button" onClick={() => setFlow(8)}>Flow 8 — Merchant Status</button>
        <button className="cta__button" onClick={() => setFlow(9)}>Flow 9 — Logging</button>
        <button className="cta__button" onClick={() => setFlow(10)}>Flow 10 — Admin Dashboard</button>
      </nav>

      {/* Render Selected Flow */}
      {renderFlow()}
    </div>
  );
}