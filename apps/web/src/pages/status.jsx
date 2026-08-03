/**
 * ============================================================
 *  HoloTap Engineering — Session Status Page
 *  File: src/pages/status.jsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 28 July 2026
 * ============================================================
 *
 *  Purpose:
 *    Displays session status after QR scan.
 *    Fetches session → shows merchant + QR + hologram status.
 *    Redirects to payments when session is ready.
 *
 *  Notes:
 *    - Uses ErrorBoundary
 *    - Deterministic architecture only
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import DashboardCard from "../components/DashboardCard.jsx";
import { getSessionStatus } from "../lib/api";

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
        <Layout
          title="Session Status"
          subtitle="Flow 7 — Session Status → Payment Readiness"
        >
          <PageHeader
            title="Session Status"
            subtitle="Verification and payment readiness"
            actions={null}
          />

          {/* Loading */}
          {loading && (
            <DashboardCard title="Loading Session…" value="">
              <p className="text-gray-600">Fetching session details…</p>
            </DashboardCard>
          )}

          {/* Error */}
          {error && (
            <DashboardCard title="Error" value="">
              <p className="text-red-600">{error}</p>
            </DashboardCard>
          )}

          {/* Session Details */}
          {session && (
            <DashboardCard title="Session Details" value="">
              <div className="flex flex-col gap-2 text-gray-800">

                <p>
                  <strong>Session ID:</strong> {session.sessionId}
                </p>

                <p>
                  <strong>Merchant:</strong> {session.merchantName}
                </p>

                <p>
                  <strong>QR Token:</strong> {session.qrToken}
                </p>

                <p>
                  <strong>Hologram:</strong> {session.hologramStatus}
                </p>

                <p>
                  <strong>Status:</strong> {session.status}
                </p>

                {session.status !== "READY" && (
                  <p className="text-yellow-600 font-medium mt-2">
                    Waiting for verification…
                  </p>
                )}

                {session.status === "READY" && (
                  <button
                    onClick={() => navigate(`/payments/${sessionId}`)}
                    className="mt-4 px-5 py-3 bg-black text-white rounded-lg font-medium"
                  >
                    Continue to Payment
                  </button>
                )}
              </div>
            </DashboardCard>
          )}
        </Layout>
      )}
    </ErrorBoundary>
  );
}
