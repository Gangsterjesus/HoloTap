/**
 * ------------------------------------------------------------
 * HoloTap Web — Activation Page (Flow 1)
 * File: src/pages/activate.tsx
 * Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 * Date: 25 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ------------------------------------------------------------
 *
 * Purpose:
 *   First step in the Web → Server pipeline.
 *   Allows user to enter activation code and receive token.
 *
 * Subsystem:
 *   Flow 1 — Activation → Token issuance
 *
 * Notes:
 *   - Inline styles removed
 *   - Uses external CSS (activate.css)
 *   - React Router DOM SPA architecture
 *   - Stores token in localStorage
 *   - ErrorBoundary provides consistent error UI
 * ------------------------------------------------------------
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activate } from "../lib/api";
import { ErrorBoundary } from "../components/ErrorBoundary";
import "../styles/activate.css";

/* ------------------------------------------------------------
   SECTION: Activation Page Component
   ------------------------------------------------------------ */
export default function Activate() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");

  /* ------------------------------------------------------------
     SECTION: Activation Handler
     ------------------------------------------------------------ */
  async function handleActivate(setError: (msg: string) => void) {
    try {
      const result = await activate(code);

      localStorage.setItem("holotap_token", result.token);

      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  }

  /* ------------------------------------------------------------
     SECTION: Render
     ------------------------------------------------------------ */
  return (
    <ErrorBoundary>
      {(setError: (msg: string) => void) => (
        <div className="activate-container">
          <h1 className="activate-title">Activate HoloTap</h1>

          <input
            className="activate-input"
            placeholder="Enter activation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="activate-button"
            onClick={() => handleActivate(setError)}
          >
            Activate
          </button>
        </div>
      )}
    </ErrorBoundary>
  );
}
