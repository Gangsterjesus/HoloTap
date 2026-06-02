/**
 * ============================================================
 *  HoloTap — Consumer Registration Screen
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Registers a new consumer using international mobile number
 *  and country/area code. Normalises mobile input and stores
 *  consumer identity in the Consumer Registry.
 *
 *  Architecture Notes:
 *  - Uses ConsumerService.js for consumer creation.
 *  - Uses CountrySelector.jsx for international mobile support.
 *  - Stores fullMobile = countryCode + cleanedMobile.
 *  - Contains no business logic — UI only.
 *  - Redirects to ConsumerLogin or ConsumerHome via onComplete().
 *
 *  Identity Model:
 *  - consumerId uniquely identifies the consumer.
 *  - fullMobile is the canonical login identifier.
 *
 *  Dependencies:
 *  - CountrySelector.jsx
 *  - ConsumerService.js (registerConsumer)
 *
 * ============================================================
 */

import { useState } from "react";
import holoBadge from "../assets/HoloTap-Badge.png";
import CountrySelector from "../components/CountrySelector.jsx";
import { registerConsumer } from "../services/ConsumerService.js";

export default function ConsumerRegistration({ onComplete }) {
  const [country, setCountry] = useState("+44");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    const cleanedMobile = mobile.replace(/\s+/g, "").replace(/^0+/, "");
    const fullMobile = country + cleanedMobile;

    const newConsumer = {
      consumerId: crypto.randomUUID(),
      fullMobile,
      country,
      mobile: cleanedMobile,
      createdAt: Date.now()
    };

    registerConsumer(newConsumer);
    alert("Registration complete.");
    onComplete();
  };

  return (
    <div className="registration__container">

      <div className="branding__block">
        <img
          src={holoBadge}
          alt="HoloTap hologram badge"
          className="branding__badge"
        />
        <h1 className="branding__title">HoloTap</h1>
        <p className="branding__tagline">Scan the hologram. Skip the fraud.</p>
      </div>

      <h2 className="registration__title">Create Your Account</h2>
      <p className="registration__subtitle">
        Enter your mobile number to get started.
      </p>

      {error && <p className="registration__error">{error}</p>}

      <div className="registration__form">
        <label className="form__label">Country</label>
        <CountrySelector value={country} onChange={setCountry} />

        <label className="form__label">Mobile Number</label>
        <input
          type="tel"
          placeholder="Enter your number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="form__input"
        />

        <button className="cta__button" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
}
