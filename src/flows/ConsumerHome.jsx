/**
 * ============================================================
 *  HoloTap — Consumer Home Screen
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Displays the authenticated consumer’s home dashboard after
 *  successful login. Provides navigation to core consumer flows:
 *    - Scan to Pay
 *    - My Payments
 *    - My Wallet
 *    - Settings
 *
 *  Flow Context:
 *  - Entry point for all consumer‑side payment actions.
 *  - Replaces the academic “Flow 3/4/5” scaffolds with a unified
 *    modern consumer dashboard.
 *  - Accessible only when a valid consumer session exists.
 *
 *  Security Notes:
 *  - Session is validated on mount using getConsumerSession().
 *  - touchConsumerSession() extends session TTL on each visit.
 *  - clearConsumerSession() is used for explicit logout.
 *  - No sensitive data is stored in component state.
 *
 *  Data Model:
 *  consumerSession = {
 *    fullMobile: string,
 *    userId: string,
 *    issuedAt: number,
 *    expiresAt: number
 *  }
 *
 *  Architecture Notes:
 *  - UI‑only component; contains no business logic.
 *  - Reads identity exclusively from ConsumerSession.js.
 *  - Uses setFlow() for navigation within the HoloTap router.
 *  - Branding assets loaded from /assets.
 *
 *  Dependencies:
 *  - ConsumerSession.js
 *      → getConsumerSession()
 *      → touchConsumerSession()
 *      → clearConsumerSession()
 *  - HoloTap branding assets (HoloTap‑Badge.png)
 *
 * ============================================================
 */

import { useEffect, useState } from "react";
import {
  getConsumerSession,
  clearConsumerSession,
  touchConsumerSession
} from "../Utils/ConsumerSession.js";
import holoBadge from "../assets/HoloTap-Badge.png";

export default function ConsumerHome({ setFlow }) {
  const [consumer, setConsumer] = useState(null);

  useEffect(() => {
    const session = getConsumerSession();

    if (!session) {
      alert("Your session has expired. Please log in again.");
      setFlow(2);
      return;
    }

    touchConsumerSession();
    setConsumer(session);
  }, [setFlow]);

  function handleLogout() {
    clearConsumerSession();
    setFlow(2);
  }

  if (!consumer) {
    return (
      <div className="home__container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="home__container">
      <header className="home__header">
        <img src={holoBadge} alt="HoloTap Badge" className="home__badge" />
        <h1 className="home__title">HoloTap</h1>
        <p className="home__tagline">Scan the hologram. Skip the fraud.</p>
        <p className="home__identity">
          Logged in as <strong>{consumer.fullMobile}</strong>
        </p>
      </header>

      <main className="home__actions">
        <button
          className="cta__button home__primary"
          onClick={() => setFlow(3)}
        >
          Scan to Pay
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow(11)}
        >
          My Payments
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow(12)}
        >
          My Wallet
        </button>

        <button
          className="cta__button"
          onClick={() => setFlow(13)}
        >
          Settings
        </button>
      </main>

      <footer className="home__footer">
        <p>HoloTap Badge • Secure UK payments</p>
        <button className="link__button logout__button" onClick={handleLogout}>
          Log Out
        </button>
      </footer>
    </div>
  );
}


