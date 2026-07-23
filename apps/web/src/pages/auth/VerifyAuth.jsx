/**
 * ============================================================
 *  HoloTap — Authentication: Verification
 *  File: src/pages/auth/VerifyAuth.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Validates the authentication token or credential returned
 *    from magic link or passkey flows.
 *
 *  Responsibilities:
 *    - Call verification endpoint
 *    - Display authentication status
 * ============================================================
 */


import { useEffect, useState } from "react";

export default function VerifyAuth() {
  const [status, setStatus] = useState("Verifying…");

  async function verify() {
    try {
      const res = await fetch("http://192.168.1.205:3001/auth/verify");
      const data = await res.json();
      setStatus(data?.message || "Authenticated.");
    } catch (err) {
      setStatus("Verification failed.");
    }
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Authentication</h1>
      <p style={styles.subtitle}>{status}</p>
    </div>
  );
}

const styles = {
  container: { padding: "40px", maxWidth: "600px", margin: "0 auto" },
  title: { fontSize: "32px", marginBottom: "10px", color: "#111" },
  subtitle: { fontSize: "18px", color: "#333" },
};
