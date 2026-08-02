/**
 * ============================================================
 *  HoloTap Web — Session Status Page (Flow 7)
 *  File: src/pages/status.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 28 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Displays session status after QR scan (Flow 6).
 *    Fetches session → shows merchant + QR + hologram status.
 *    Redirects to Flow 8 (payments) when session is ready.
 *
 *  Subsystem:
 *    Flow 7 — Session Status → Payment Readiness
 *
 *  Notes:
 *    - Uses external CSS (status.css)
 *    - Uses ErrorBoundary
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { getSessionStatus } from "../lib/api";
import "../styles/status.css";

export default function Status() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await getSessionStatus(sessionId);

        if (!res || !res.sessionId) {
          setError("SESSION_NOT_FOUND");
          setLoading(false);
          return;
        }

        setSession(res);
        setLoading(false);

        if (res.status === "READY") {
          navigate(`/payments/${sessionId}`);
        }
      } catch (err) {
        console.error("Status error:", err);
        setError("NETWORK_ERROR");
        setLoading(false);
      }
    }

    fetchStatus();
  }, [sessionId, navigate]);

  return (
    <ErrorBoundary>
      {() => (
        <div className="status-container">
          {loading && <p>Loading session…</p>}
          {error && <p className="status-error">{error}</p>}

          {session && (
            <div className="status-card">
              <h1>Session Status</h1>

              <p><strong>Session ID:</strong> {session.sessionId}</p>
              <p><strong>Merchant:</strong> {session.merchantName}</p>
              <p><strong>QR Token:</strong> {session.qrToken}</p>
              <p><strong>Hologram:</strong> {session.hologramStatus}</p>
              <p><strong>Status:</strong> {session.status}</p>

              {session.status !== "READY" && (
                <p className="pending">Waiting for verification…</p>
              )}

              {session.status === "READY" && (
                <button
                  className="continue-btn"
                  onClick={() => navigate(`/payments/${sessionId}`)}
                >
                  Continue to Payment
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </ErrorBoundary>
  );
}
