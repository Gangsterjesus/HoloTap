import { useState } from "react";
import CountrySelector from "../components/CountrySelector.jsx";
import hologram from "../assets/HoloTap-Badge.png";

export default function HTRegistration() {
  const [country, setCountry] = useState("+44");
  const [mobile, setMobile] = useState("");

  const handleSubmit = () => {
    if (!mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    alert(`Registration started for: ${country} ${mobile}`);
  };

  return (
    <div style={{ padding: 20 }}>

      {/* FLOW 0 — HOLOTAP BADGE */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <img
          src={hologram}
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

        <label style={{ display: "block", marginBottom: 8 }}>
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