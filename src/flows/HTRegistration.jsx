import { useState } from "react";
import CountrySelector from "../components/CountrySelector.jsx";

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