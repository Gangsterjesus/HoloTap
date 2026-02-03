import { useState } from "react";
import WelcomeBanner from "./components/WelcomeBanner.jsx";

// Flows with clear names
import HTRegistration from "./flows/HTRegistration.jsx";
import HTReturningUser from "./flows/HTReturningUser.jsx";
import HTPayment from "./flows/HTPayment.jsx";
import HTPaymentConfirmation from "./flows/HTPaymentConfirmation.jsx";
import HTCreatorDashboard from "./flows/HTCreatorDashboard.jsx";
import HTIdentityCard from "./flows/HTIdentityCard.jsx";

// Components
import Feature from "./components/Feature.jsx";

export default function Holo() {
  const [flow, setFlow] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--holo-bg)", color: "white" }}>
      
      {/* Header */}
      <header className="header">
        <h1 className="header__title">HoloTap</h1>
        <p className="header__tagline">Scan the hologram. Skip the fraud.</p>
      </header>

      {/* Navigation with clear flow names */}
      <nav style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
        <button className="cta__button" onClick={() => setFlow(0)}>Home</button>
        <button className="cta__button" onClick={() => setFlow(1)}>Flow 1 — Registration</button>
        <button className="cta__button" onClick={() => setFlow(2)}>Flow 2 — Returning User Login</button>
        <button className="cta__button" onClick={() => setFlow(3)}>Flow 3 — Payment</button>
        <button className="cta__button" onClick={() => setFlow(4)}>Flow 4 — Confirmation + Mascot Reward</button>
        <button className="cta__button" onClick={() => setFlow(5)}>Flow 5 — Creator Dashboard</button>
        <button className="cta__button" onClick={() => setFlow(6)}>Flow 6 — QR Identity Card</button>
      </nav>

      {/* Landing Screen */}
      {flow === 0 && (
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
      )}

      {/* Flow Rendering */}
      {flow === 1 && <HTRegistration setFlow={setFlow} />}
      {flow === 2 && <HTReturningUser setFlow={setFlow} />}
      {flow === 3 && <HTPayment setFlow={setFlow} />}
      {flow === 4 && <HTPaymentConfirmation setFlow={setFlow} />}
      {flow === 5 && <HTCreatorDashboard setFlow={setFlow} />}
      {flow === 6 && <HTIdentityCard setFlow={setFlow} />}
    </div>
  );
}