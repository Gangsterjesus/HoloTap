/**
 * ============================================================
 *  HoloTap — Authentication: Passkey
 *  File: src/pages/auth/Passkey.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Initiates passkey authentication using device‑bound credentials
 *    or hardware security keys.
 *
 *  Responsibilities:
 *    - Inform user of browser‑level passkey prompt
 *    - Provide guidance for completing passkey authentication
 * ============================================================
 */

export default function Passkey() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Use Passkey</h1>
      <p style={styles.subtitle}>
        Your browser will prompt you to use a saved passkey.
      </p>
      <p style={styles.text}>
        Follow the browser instructions to complete sign‑in using your device
        credential or security key.
      </p>
    </div>
  );
}

const styles = {
  container: { padding: "40px", maxWidth: "600px", margin: "0 auto" },
  title: { fontSize: "32px", marginBottom: "10px", color: "#111" },
  subtitle: { fontSize: "18px", color: "#333", marginBottom: "20px" },
  text: { fontSize: "16px", color: "#222", lineHeight: "1.6" },
};

