/**
 * ============================================================
 *  HoloTap — Creator Dashboard (Main Overview)
 *  File: src/pages/dashboard/Dashboard.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 22 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  The main dashboard for creators after onboarding and verification.
 *  Displays high‑level metrics, recent activity, and quick actions.
 *  This is the central hub for all creator operations.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { verifySession } from "../../services/api"; // adjust if your api.ts lives elsewhere
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Flow 3 state
  const [sessionStatus, setSessionStatus] = useState("pending");
  const [updatedAt, setUpdatedAt] = useState("");

  const sessionId = localStorage.getItem("holotap_sessionId");

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await verifySession(sessionId);
        setSessionStatus(res.status);
        setUpdatedAt(res.updatedAt);

        if (res.status === "completed" || res.status === "expired") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div style={styles.container}>

      {/* ============================
          HEADER SECTION
          ============================ */}
      <h1 style={styles.title}>Creator Dashboard</h1>
      <p style={styles.subtitle}>Your hologram badge activity and payment overview.</p>

      {/* ============================
          METRICS SECTION
          ============================ */}
      <div style={styles.metrics}>
        <div style={styles.card}>
          <h2>Session Status</h2>
          <p>{sessionStatus}</p>
        </div>

        <div style={styles.card}>
          <h2>Last Updated</h2>
          <p>{updatedAt || "—"}</p>
        </div>

        <div style={styles.card}>
          <h2>Verification Status</h2>
          <p>{sessionStatus === "completed" ? "Verified" : "Pending"}</p>
        </div>
      </div>

      {/* ============================
          QUICK ACTIONS SECTION
          ============================ */}
      <div style={styles.actions}>
        <a href="/payments" style={styles.button}>View Payments</a>
        <a href="/identity" style={styles.button}>Identity Settings</a>
        <a href="/status" style={styles.button}>Badge Status</a>

        {sessionStatus === "expired" && (
          <button
            style={styles.button}
            onClick={() => navigate("/scan")}
          >
            Restart Session
          </button>
        )}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },

  metrics: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
  },

  card: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    textAlign: "center",
  },

  actions: {
    display: "flex",
    gap: "20px",
  },

  button: {
    padding: "14px 24px",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
