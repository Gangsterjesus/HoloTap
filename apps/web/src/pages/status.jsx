/**
 * ============================================================
 *  HoloTap — Badge Status (Flow 4)
 *  File: src/pages/status.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 25 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Creator-facing badge status page. Shows live QR/session state,
 *  verification status, and operational badge metadata.
 *
 *  Subsystem:
 *  Flow 4 — Badge Status → Session Verify → Creator Monitoring
 *
 *  Notes:
 *  - Polls /session/verify every 3 seconds
 *  - Uses holotap_sessionId from localStorage
 *  - Uses external CSS (status.css)
 * ============================================================
 */

import { useEffect, useState } from "react";
import { verifySession } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/status.css";

export default function Status() {
  const navigate = useNavigate();

  // ============================
  // STATE MANAGEMENT
  // ============================
  const [sessionStatus, setSessionStatus] = useState("pending");
  const [updatedAt, setUpdatedAt] = useState("");
  const [error, setError] = useState("");

  const sessionId = localStorage.getItem("holotap_sessionId");

  // ============================
  // POLLING LOOP (FLOW 4 CORE)
  // ============================
  useEffect(() => {
    if (!sessionId) {
      setError("No active session found.");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await verifySession(sessionId);
        setSessionStatus(res.status);
        setUpdatedAt(res.updatedAt);

        if (res.status === "completed" || res.status === "expired") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Status polling error:", err);
        setError("Unable to verify badge status.");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId]);

  // ============================
  // RENDER
  // ============================
  return (
    <div className="status-container">

      {/* HEADER */}
      <h1 className="status-title">Badge Status</h1>
      <p className="status-subtitle">Live hologram badge and QR activity.</p>

      {/* ERROR */}
      {error && <p className="status-error">{error}</p>}

      {/* STATUS CARD */}
      <div className="status-card">
        <h2>Session Status</h2>
        <p>{sessionStatus}</p>
      </div>

      {/* TIMESTAMP CARD */}
      <div className="status-card">
        <h2>Last Updated</h2>
        <p>{updatedAt || "—"}</p>
      </div>

      {/* ACTIONS */}
      <div className="status-actions">
        <button
          className="status-button"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

        <button
          className="status-button"
          onClick={() => navigate("/scan")}
        >
          Re‑Scan QR
        </button>

        {sessionStatus === "expired" && (
          <button
            className="status-button"
            onClick={() => navigate("/scan")}
          >
            Restart Session
          </button>
        )}
      </div>
    </div>
  );
}
