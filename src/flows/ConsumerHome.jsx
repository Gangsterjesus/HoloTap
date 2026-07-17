/**
 * ============================================================
 *  HoloTap — Consumer Home Screen
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides the consumer with a central navigation hub after
 *  authentication. Allows access to payment entry, wallet,
 *  payment history, and future consumer tools.
 *
 *  Architecture Notes:
 *  - Loads consumer session via ConsumerSession.js.
 *  - Displays consumer identity and session metadata.
 *  - Navigation controlled by React Router.
 *  - Designed for future backend expansion:
 *        • Payment history
 *        • Wallet balance
 *        • Loyalty features
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - All imports validated for case‑sensitivity.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, minimal, user‑friendly design.
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getConsumerSession as getSession,
  clearConsumerSession
} from "./utils/ConsumerSession.js";

export default function ConsumerHome() {
  const navigate = useNavigate();
  const [consumer, setConsumer] = useState(null);

  useEffect(() => {
    const s = getSession();
    if (s) {
      setConsumer(s);
    }
  }, []);

  const logout = () => {
    clearConsumerSession();
    navigate("/login", { replace: true });
  };

  return (
    <div className="home__container">
      <header className="home__header">
        <h1 className="home__title">HoloTap</h1>
        <p className="home__tagline">Scan the hologram. Skip the fraud.</p>
      </header>

      {consumer && (
        <p style={{ marginTop: 10, opacity: 0.8 }}>
          Logged in as <strong>{consumer.fullMobile}</strong>
        </p>
      )}

      <main className="home__actions">
        <button
          className="cta__button home__primary"
          onClick={() => navigate("/pay")}
        >
          Scan to Pay
        </button>

        <button
          className="cta__button"
          onClick={() => navigate("/payments")}
        >
          My Payments
        </button>

        <button
          className="cta__button"
          onClick={() => navigate("/wallet")}
        >
          My Wallet
        </button>

        <button
          className="cta__button"
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>
      </main>

      <footer className="home__footer">
        <button
          className="link__button"
          style={{ marginTop: 20 }}
          onClick={logout}
        >
          Log Out
        </button>

        <p style={{ marginTop: 10 }}>HoloTap Badge • Secure UK payments</p>
      </footer>
    </div>
  );
}

