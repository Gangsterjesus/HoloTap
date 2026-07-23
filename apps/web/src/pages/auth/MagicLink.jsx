/**
 * ============================================================
 *  HoloTap — Authentication: Magic Link
 *  File: src/pages/auth/MagicLink.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 23 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Confirms that a magic link has been sent to the user’s email
 *    and provides guidance for completing authentication.
 *
 *  Responsibilities:
 *    - Display confirmation message
 *    - Provide fallback instructions
 * ============================================================
 */


export default function MagicLink() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Magic Link Sent</h1>
      <p style={styles.subtitle}>
        Check your email and click the link to complete sign‑in.
      </p>
      <p style={styles.text}>
        If you don’t see the email, check your spam folder or try again from
        the login page.
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
