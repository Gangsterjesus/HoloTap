/**
 * ------------------------------------------------------------
 * HoloTap Web — API Client Wrapper + Typed Route Helpers
 * Engineer: Raymond Newton
 * Date: 25 July 2026
 *
 * Purpose:
 *   Unified typed fetch layer for HoloTap Web.
 *   Provides strongly‑typed wrappers for all HoloTapServer routes.
 *   Covers Activation → QR → Session flows (1–4).
 *
 * Subsystem:
 *   Web → Server API Pipeline
 *
 * Notes:
 *   - Enforces JSON encoding/decoding
 *   - Detects offline server conditions
 *   - Normalises error messages for UI boundaries
 *   - Guarantees typed responses for all routes
 * ------------------------------------------------------------
 */



// ------------------------------------------------------------
// SECTION: Core API Wrapper
// Engineer Notes:
//   This wrapper is the backbone of all Web→Server communication.
//   Every route helper calls this function.
//   It enforces JSON headers, typed responses, and consistent error handling.
// ------------------------------------------------------------
export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;



  // ------------------------------------------------------------
  // SECTION: Fetch Execution
  // Engineer Notes:
  //   - Spread options to allow custom methods (POST/GET)
//   - Force JSON headers unless overridden
//   - All server errors are normalised into JS Error objects
// ------------------------------------------------------------
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });



    // ------------------------------------------------------------
    // SECTION: HTTP Error Handling
    // Engineer Notes:
    //   - Non-2xx responses are treated as failures
    //   - Server text is surfaced directly for debugging
    //   - Prevents silent failures in UI components
    // ------------------------------------------------------------
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }



    // ------------------------------------------------------------
    // SECTION: JSON Decode
    // Engineer Notes:
    //   - All responses are expected to be JSON
    //   - Cast to generic type T for typed route helpers
    // ------------------------------------------------------------
    return res.json() as Promise<T>;



  } catch (err) {

    // ------------------------------------------------------------
    // SECTION: Offline / Network Failure
    // Engineer Notes:
    //   - fetch() throws TypeError when server is unreachable
    //   - This allows UI to show “Server unreachable” instead of
    //     a generic error
    // ------------------------------------------------------------
    if (err instanceof TypeError) {
      throw new Error("Server unreachable. Check connection.");
    }

    // ------------------------------------------------------------
    // SECTION: Re-throw for UI Boundaries
    // Engineer Notes:
    //   - All other errors bubble up to ErrorBoundary
    // ------------------------------------------------------------
    throw err;
  }
}



/**
 * ------------------------------------------------------------
 * Typed Route Helpers
 * Engineer: Raymond Newton
 * Date: 25 July 2026
 *
 * Purpose:
 *   Strongly‑typed wrappers for all HoloTapServer routes.
 *   Ensures consistent JSON shapes and predictable behaviour
 *   across Activation → QR → Session flows.
 *
 * Notes:
 *   - Prevents UI components from misinterpreting server data
 *   - Guarantees typed responses for all fetch calls
 *   - Centralises route definitions for maintainability
 * ------------------------------------------------------------
 */



// ------------------------------------------------------------
// SECTION: Activation Response Shape
// Engineer Notes:
//   Returned by POST /activate.
//   Token is used for all subsequent authenticated flows.
//   expiresAt is ISO timestamp for client-side expiry logic.
// ------------------------------------------------------------
export interface ActivationResponse {
  token: string;
  tenantId: string;
  expiresAt: string;
}



// ------------------------------------------------------------
// SECTION: QR Validation Response Shape
// Engineer Notes:
//   Returned by POST /qr/validate.
//   valid=false includes reason for UI error boundaries.
//   tokenId is used to start a session if QR is valid.
// ------------------------------------------------------------
export interface QRValidationResponse {
  valid: boolean;
  tokenId?: string;
  reason?: string;
}



// ------------------------------------------------------------
// SECTION: Session Start Response Shape
// Engineer Notes:
//   Returned by POST /session/start.
//   sessionId is used for polling /session/verify.
//   startedAt is ISO timestamp for UI display.
// ------------------------------------------------------------
export interface SessionStartResponse {
  sessionId: string;
  startedAt: string;
}



// ------------------------------------------------------------
// SECTION: Session Verify Response Shape
// Engineer Notes:
//   Returned by GET /session/verify.
//   status drives dashboard UI state machine.
//   updatedAt allows client to detect stale polling.
// ------------------------------------------------------------
export interface SessionVerifyResponse {
  status: "pending" | "completed" | "expired";
  sessionId: string;
  updatedAt: string;
}



// ------------------------------------------------------------
// SECTION: Activation Route Helper
// Engineer Notes:
//   Flow 1 entry point.
//   Wraps POST /activate with typed response.
//   UI stores token in localStorage for subsequent flows.
// ------------------------------------------------------------
export const activate = (code: string) =>
  api<ActivationResponse>("/activate", {
    method: "POST",
    body: JSON.stringify({ code })
  });



// ------------------------------------------------------------
// SECTION: QR Validation Route Helper
// Engineer Notes:
//   Flow 2 entry point.
//   Wraps POST /qr/validate.
//   If valid=true → proceed to startSession.
//   If valid=false → UI shows error boundary.
// ------------------------------------------------------------
export const validateQR = (qr: string) =>
  api<QRValidationResponse>("/qr/validate", {
    method: "POST",
    body: JSON.stringify({ qr })
  });



// ------------------------------------------------------------
// SECTION: Session Start Route Helper
// Engineer Notes:
//   Flow 3 entry point.
//   Wraps POST /session/start.
//   tokenId comes from validateQR().
// ------------------------------------------------------------
export const startSession = (tokenId: string) =>
  api<SessionStartResponse>("/session/start", {
    method: "POST",
    body: JSON.stringify({ tokenId })
  });



// ------------------------------------------------------------
// SECTION: Session Verify Route Helper
// Engineer Notes:
//   Flow 4 polling endpoint.
//   UI polls every 3 seconds until status=completed.
//   GET request uses query string for simplicity.
// ------------------------------------------------------------
export const verifySession = (sessionId: string) =>
  api<SessionVerifyResponse>(`/session/verify?sessionId=${sessionId}`);
