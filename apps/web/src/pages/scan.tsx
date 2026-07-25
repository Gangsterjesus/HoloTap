/**
 * ============================================================
 *  HoloTap Web — QR Scan Page (Flow 2)
 *  File: scan.tsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 25 July 2026
 * ============================================================
 *
 *  Purpose:
 *    Full‑screen QR scanner for Flow 2.
 *    Validates QR → starts session → redirects to dashboard.
 *
 *  Subsystem:
 *    Flow 2 — QR → Validation → Session Start
 *
 *  Notes:
 *    - Uses html5-qrcode
 *    - Strict TypeScript safe
 *    - Matches API types exactly (tokenId → sessionId)
 * ============================================================
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { validateQR, startSession } from "../../lib/api";
import { ErrorBoundary } from "../components/ErrorBoundary";

export default function Scan() {
  const navigate = useNavigate();
  const scannerRef = useRef<any>(null); // html5-qrcode has no TS types

  async function handleScanSuccess(decodedText: string) {
    try {
      const validated = await validateQR(decodedText);

      if (!validated.valid || !validated.tokenId) {
        alert(validated.reason || "Invalid QR code");
        return;
      }

      const session = await startSession(validated.tokenId);

      localStorage.setItem("holotap_sessionId", session.sessionId);

      navigate("/dashboard");
    } catch (err) {
      console.error("QR error:", err);
      alert("Invalid QR code. Please try again.");
    }
  }

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0
      },
      false
    );

    scannerRef.current.render(
      (decodedText: string) => handleScanSuccess(decodedText),
      (errorMessage: string) => {}
    );

    return () => {
      scannerRef.current?.clear();
      scannerRef.current = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      {() => (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div id="qr-reader" style={{ width: "100%", maxWidth: "500px" }} />
        </div>
      )}
    </ErrorBoundary>
  );
}

