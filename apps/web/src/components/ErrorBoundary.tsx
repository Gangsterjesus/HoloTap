/**
 * ------------------------------------------------------------
 * HoloTap Web — Error Boundary Component
 * Engineer: Raymond Newton
 * Date: 25 July 2026
 *
 * Purpose:
 *   Provides a controlled UI surface for API and network errors.
 *   Wraps all Web → Server interactions (Activation, QR, Session).
 *
 * Subsystem:
 *   Web → UI Error Handling Layer
 *
 * Notes:
 *   - Normalises error display across all pages
 *   - Handles offline/server unreachable states
 *   - Prevents unhandled promise rejections in UI
 * ------------------------------------------------------------
 */

import { useState } from "react";



// ------------------------------------------------------------
// SECTION: ErrorBoundary Wrapper
// Engineer Notes:
//   This component wraps any interactive UI that performs API calls.
//   It exposes a setter (setError) to child components.
//   Child components call setError(err.message) when API fails.
//   Boundary then renders a consistent error UI.
// ------------------------------------------------------------
export function ErrorBoundary({ children }: { children: (setError: (msg: string) => void) => JSX.Element }) {
  const [error, setError] = useState<string | null>(null);



  // ------------------------------------------------------------
  // SECTION: Error UI Surface
  // Engineer Notes:
//   - When error is set, normal UI is replaced with a red alert box.
//   - Prevents partial rendering of broken UI states.
//   - Encourages predictable user experience during failures.
// ------------------------------------------------------------
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded border border-red-300">
        <strong>Error:</strong> {error}
      </div>
    );
  }



  // ------------------------------------------------------------
  // SECTION: Normal Rendering Path
  // Engineer Notes:
  //   - children(setError) gives child components control over error state
  //   - This pattern avoids try/catch duplication across pages
  //   - Keeps error logic centralised and maintainable
  // ------------------------------------------------------------
  return children(setError);
}
