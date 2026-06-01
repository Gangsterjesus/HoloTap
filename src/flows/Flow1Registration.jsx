// src/flows/Flow1Registration.jsx

import { useState } from "react";
import holoBadge from "../assets/HoloTap-Badge.png";
import CountrySelector from "../components/CountrySelector.jsx";
import { saveUser } from "../services/userService";

export default function Flow1Registration({ setFlow }) {
  const [country, setCountry] = useState("+44");
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    if (!mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    // Normalise mobile number (remove spaces, leading zeros)
    const cleanedMobile = mobile.replace(/\s+/g, "").replace(/^0+/, "");

    const newUser = {
      name: "Creator",                 // placeholder name
      country,
      mobile: cleanedMobile,
      userId: crypto.randomUUID()
    };

    // Save to storage (ht_users + ht_user)
    saveUser(newUser);

    alert("Registration complete.");
    setFlow(2); // Move to Flow 2 — Returning User Login
  };

  return (
    <div style={{ padding: 20 }}>

      {/* FLOW 0 — HOLOTAP BADGE */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <img
          src={holoBadge}
          alt="HoloTap hologram badge"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            marginBottom: 20,
            boxShadow: "0 0 20px rgba(255,255,255,0.25)"
          }}
        />
        <h1>HoloTap</h1>
        <p>Scan the hologram. Skip the fraud.</p>
      </div>

      {/* FLOW 1 — REGISTRATION */}
      <h2>Flow 1 — Registration</h2>
      <p>Select your country and enter your mobile number.</p>

      <div style={{ marginTop: 20 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Country
        </label>

        <CountrySelector value={country} onChange={setCountry} />

        <label style={{ display: "block", marginBottom: 8, marginTop: 15 }}>
          Mobile Number
        </label>

        <input
          type="tel"
          placeholder="Enter your number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            background: "#111",
            color: "white",
            border: "1px solid #555",
            borderRadius: 6
          }}
        />

        <button
          className="cta__button"
          style={{ marginTop: 20 }}
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
