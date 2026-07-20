/**
 * ============================================================
 *  HoloTap — Consumer Login Screen
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides secure consumer authentication using mobile number
 *  and international area codes. Validates identity against the
 *  Consumer Registry and establishes a Consumer Session.
 *
 *  Architecture Notes:
 *  - Uses ConsumerService.js for consumer lookup.
 *  - Uses ConsumerSession.js for session creation and expiry.
 *  - Uses CountrySelector.jsx for international mobile support.
 *  - Contains no business logic — UI only.
 *  - Redirects to ConsumerHome on successful login.
 *
 *  Identity Model:
 *  - fullMobile = countryCode + cleanedMobile
 *  - consumerId uniquely identifies the consumer
 *
 *  Dependencies:
 *  - CountrySelector.jsx
 *  - ConsumerService.js (findConsumer)
 *  - ConsumerSession.js (createConsumerSession)
 *
 * ============================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../components/CountrySelector";
import { findConsumer } from "../services/ConsumerService";
import { createConsumerSession } from "../utils/ConsumerSession";

export default function ConsumerLogin() {
  const navigate = useNavigate();

  const [country, setCountry] = useState("+44");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    setError("");

    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    const cleaned = mobile.replace(/\s+/g, "").replace(/^0+/, "");
    const fullMobile = country + cleaned;

    const consumer = findConsumer(fullMobile);

    if (!consumer) {
      setError("No account found for this number.");
      return;
    }

    createConsumerSession(consumer);

    // Redirect to consumer home
    navigate("/consumer", { replace: true });
  }

  return (
    <div className="login__container">
      <h2 className="login__title">Welcome Back</h2>
      <p className="login__subtitle">Confirm your mobile number to continue.</p>

      {error && <p className="login__error">{error}</p>}

      <label className="form__label">Country</label>
      <CountrySelector value={country} onChange={setCountry} />

      <label className="form__label">Mobile Number</label>
      <input
        type="tel"
        className="form__input"
        placeholder="Enter your number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <button className="cta__button" onClick={handleLogin}>
        Confirm & Continue
      </button>

      <button
        className="link__button"
        onClick={() => navigate("/register")}
      >
        Not you? Register again
      </button>
    </div>
  );
}
