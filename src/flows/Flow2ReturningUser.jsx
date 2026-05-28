// src/flows/Flow2ReturningUser.jsx

import { useState, useEffect } from "react";
import { getUser } from "../services/UserService";
import { createSession } from "../Utils/Session";

export default function HTReturningUser({ setFlow }) {
  const [user, setUser] = useState(null);
  const [mobileInput, setMobileInput] = useState("");

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  if (!user) {
    return (
      <div className="ht-container">
        <h2>Flow 2 — Returning User Login</h2>
        <p>No user found. Please register first.</p>
        <button className="cta__button" onClick={() => setFlow(1)}>
          Go to Registration
        </button>
      </div>
    );
  }

  const handleLogin = () => {
    if (mobileInput.trim() !== user.mobile) {
      alert("Mobile number does not match our records.");
      return;
    }

    // Create a new session
    createSession(user.userId);

    // Move to dashboard
    setFlow(5);
  };

  return (
    <div className="ht-container">
      <h2>Flow 2 — Returning User Login</h2>
      <p>Welcome back, {user.name}. Please confirm your identity.</p>

      <div className="ht-card" style={{ marginTop: 20 }}>
        <p><strong>Registered Mobile:</strong> {user.mobile}</p>

        <input
          type="text"
          placeholder="Enter your mobile number"
          value={mobileInput}
          onChange={(e) => setMobileInput(e.target.value)}
          className="ht-input"
          style={{ marginTop: 10 }}
        />

        <button
          className="cta__button"
          style={{ marginTop: 15 }}
          onClick={handleLogin}
        >
          Confirm & Continue
        </button>
      </div>

      <button
        className="cta__button"
        style={{ marginTop: 20 }}
        onClick={() => setFlow(1)}
      >
        Not you? Register again
      </button>
    </div>
  );
} 