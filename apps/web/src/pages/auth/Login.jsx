
/**
 * ============================================================
 *  HoloTap — Authentication: Login
 *  File: src/pages/auth/Login.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Entry point for user authentication. Allows users to initiate
 *    sign‑in using either a magic link or a passkey credential.
 *
 *  Responsibilities:
 *    - Capture user email input
 *    - Request magic link delivery
 *    - Initiate passkey authentication flow
 * ============================================================
 */

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  async function requestMagicLink() {
    await fetch("http://192.168.1.205:3001/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  async function usePasskey() {
    await fetch("http://192.168.1.205:3001/auth/passkey/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign In</h1>
      <p style={styles.subtitle}>Choose magic link or passkey.</p>

      <div style={styles.form}>
        <label style={styles.label}>
          Email address
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <div style={styles.actions}>
          <button style={styles.buttonPrimary} onClick={requestMagicLink}>
            Send Magic Link
          </button>
          <button style={styles.buttonSecondary} onClick={usePasskey}>
            Use Passkey
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", maxWidth: "600px", margin: "0 auto" },
  title: { fontSize: "36px", marginBottom: "10px", color: "#111" },
  subtitle: { fontSize: "18px", color: "#333", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  label: { fontSize: "16px", color: "#222", textAlign: "left" },
  input: {
    marginTop: "8px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #CCC",
    width: "100%",
  },
  actions: { display: "flex", gap: "16px", marginTop: "20px" },
  buttonPrimary: {
    padding: "12px 20px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "12px 20px",
    backgroundColor: "#EAEAEA",
    color: "#111",
    borderRadius: "8px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  },
};
