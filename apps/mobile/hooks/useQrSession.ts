/**
 * =============================================================================
 * HOLOTAP MOBILE — QR SESSION LAYER v1 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          useQrSession.ts
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Provides identity‑aware QR session state for:
 *   • Active QR payment sessions
 *   • Session expiry metadata
 *   • Identity‑bound session validity
 *
 * This hook forms part of the merchant identity subsystem. It ensures that
 * QR session data is only fetched when the merchant identity is verified.
 *
 * SESSION LIFECYCLE:
 *   1. Identity must be loaded
 *   2. Identity must be verified
 *   3. QR session is fetched from backend
 *   4. Session is exposed to UI consumers
 *
 * FAILURE MODES:
 *   • Identity not ready → session suppressed
 *   • Identity invalid → session suppressed
 *   • Backend unreachable → error flag raised
 *
 * =============================================================================
 */

import { useEffect, useState } from "react";
import { useMerchantIdentity } from "./useMerchantIdentity";

/**
 * QR session payload returned by backend.
 * `active` determines whether a live QR session exists.
 */
interface QRSessionPayload {
  active: boolean;
  sessionId?: string;
  expiresAt?: string;
}

/**
 * Main QR session hook.
 * Identity‑aware: only fetches QR session when merchant identity is verified.
 */
export function useQrSession() {
  // Identity subsystem
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  // QR session state
  const [session, setSession] = useState<QRSessionPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * Load QR session once identity is ready.
   * Identity must be verified before QR session can be fetched.
   */
  useEffect(() => {
    async function loadSession() {
      // Identity not ready or not verified → suppress QR session
      if (
        identityLoading ||
        identityError ||
        !identity ||
        identity.status !== "verified"
      ) {
        setSession(null);
        setLoading(false);
        return;
      }

      // Identity verified → fetch QR session
      try {
        const res = await fetch("https://api.holotap.co/merchant/qr-session");
        const json = await res.json();
        setSession(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [identity, identityLoading, identityError]);

  /**
   * Expose:
   *   • session: QR session payload or null
   *   • loading: QR session loading state
   *   • error: QR session error state
   *   • identity: merchant identity (verified/pending/blocked)
   */
  return { session, loading, error, identity };
}
