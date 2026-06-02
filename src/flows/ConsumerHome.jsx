/**
 * HoloTap — Consumer Home Screen
 * Author: Raymond Newton
 * Date: 02 June 2026
 *
 * Purpose:
 * Displays the authenticated consumer’s home dashboard after login.
 * Provides access to Scan to Pay, Payments, Wallet, and Settings.
 *
 * Architecture Notes:
 * - Uses ConsumerSession.js for session validation, expiry, and refresh.
 * - Reads consumer identity (fullMobile) from active session.
 * - Contains no business logic — UI only.
 * - Redirects to ConsumerLogin if session is missing or expired.
 *
 * Dependencies:
 * - ConsumerSession.js (getConsumerSession, touchConsumerSession, clearConsumerSession)
 * - Branding assets (HoloTap badge)
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


