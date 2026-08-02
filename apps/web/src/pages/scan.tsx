/**
 * ============================================================
 *  HoloTap Web — QR Scan Page (Flow 6)
 *  File: src/pages/scan.tsx
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Date: 28 July 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *    Full‑screen QR scanner for Flow 6.
 *    Validates QR → resumes/creates session → redirects to status page.
 *
 *  Subsystem:
 *    Flow 6 — QR → Validation → Session Resume
 *
 *  Notes:
 *    - Uses external CSS (scan.css)
 *    - Uses html5-qrcode
 * ============================================================
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { validateQR, startSession } from "../lib/api";
import { ErrorBoundary } from "../components/ErrorBoundary";
import "../styles/scan.css";

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

      navigate(`/status/${session.sessionId}`);
    } catch (err) {
      console.error("QR error:", err);
      alert("Invalid QR code. Please try again.");
    }
  }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      (decodedText: string) => handleScanSuccess(decodedText),
      () => {}
    );

    return () => {
      scannerRef.current?.clear();
      scannerRef.current = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      {() => (
        <div className="scan-container">
          <div id="qr-reader" className="scan-reader" />
        </div>
      )}
    </ErrorBoundary>
  );
}
