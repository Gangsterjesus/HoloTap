/**
 * ------------------------------------------------------------
 * HoloTap Web — Activation Page (Flow 1)
 * Engineer: Raymond Newton
 * Date: 25 July 2026
 *
 * Purpose:
 *   First step in the Web → Server pipeline.
 *   Allows user to enter activation code and receive token.
 *
 * Subsystem:
 *   Flow 1 — Activation → Token issuance
 *
 * Notes:
 *   - React Router DOM (SPA architecture)
 *   - Uses useNavigate() for routing
 *   - Stores token in localStorage
 *   - ErrorBoundary provides consistent error UI
 * ------------------------------------------------------------
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activate } from "../../lib/api";


import { ErrorBoundary } from "../components/ErrorBoundary";



// ------------------------------------------------------------
// SECTION: Activation Page Component
// Engineer Notes:
//   React Router DOM automatically treats this as a client component.
//   No "use client" directive required.
// ------------------------------------------------------------
export default function Activate() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");



  // ------------------------------------------------------------
  // SECTION: Activation Handler
  // Engineer Notes:
  //   - Wraps activate() API call
  //   - Stores token in localStorage for future flows
  //   - Redirects to /dashboard on success
  //   - Strict-mode safe error handling (err is unknown)
// ------------------------------------------------------------
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



  // ------------------------------------------------------------
  // SECTION: Render
  // Engineer Notes:
  //   - ErrorBoundary wraps the entire interactive block
  //   - setError is typed explicitly to satisfy TS strict mode
  // ------------------------------------------------------------
  return (
    <ErrorBoundary>
      {(setError: (msg: string) => void) => (
        <div className="p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Activate HoloTap</h1>

          <input
            className="border p-2 w-full mb-4"
            placeholder="Enter activation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => handleActivate(setError)}
          >
            Activate
          </button>
        </div>
      )}
    </ErrorBoundary>
  );
}
