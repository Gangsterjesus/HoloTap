/**
 * =============================================================================
 * HOLOTAP MOBILE — MERCHANT IDENTITY LAYER v1 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          useMerchantIdentity.ts
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Provides the mobile identity context for:
 *   • Merchant verification status
 *   • Merchant hologram identity
 *   • Merchant profile metadata
 *   • Identity‑bound UI states across dashboard + QR flows
 *
 * IDENTITY LIFECYCLE:
 *   1. Load merchant identity from backend
 *   2. Expose identity status (verified / pending / blocked)
 *   3. Provide identity metadata to downstream hooks (QR session, dashboard)
 *   4. Ensure safe fallback states when identity is unavailable
 *
 * VERSION NOTES:
 *   • v1: Initial mobile identity hook
 *   • Backend‑driven identity payload
 *   • Strong TypeScript typing
 *   • Safe fallback states for dashboard + QR session
 *
 * ROUTING (Expo Router v6):
 * Identity‑aware screens:
 *   "/merchant-dashboard"
 *   "/generate-qrc"
 *   "/live-payments"
 *   "/refund"
 *   "/settlement"
 *   "/settings"
 * =============================================================================
 */

import { useEffect, useState } from "react";

/**
 * Merchant identity payload returned by backend.
 * `status` determines whether merchant is allowed to generate QR sessions.
 */
interface MerchantIdentity {
  id: string;
  name: string;
  status: "verified" | "pending" | "blocked";
  hologramId?: string;
}

/**
 * Main merchant identity hook.
 * Loads identity once on mount and exposes:
 *   • identity: merchant identity payload or null
 *   • loading: identity loading state
 *   • error: identity error state
 */
export function useMerchantIdentity() {
  // Identity state
  const [identity, setIdentity] = useState<MerchantIdentity | null>(null);

  // Loading + error flags
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * Load merchant identity from backend.
   * This runs once on mount.
   */
  useEffect(() => {
    async function loadIdentity() {
      try {
        const res = await fetch("https://api.holotap.co/merchant/identity");
        const json = await res.json();

        // Store identity payload
        setIdentity(json);
      } catch {
        // Backend unreachable or payload invalid
        setError(true);
      } finally {
        // Identity load complete (success or failure)
        setLoading(false);
      }
    }

    loadIdentity();
  }, []);

  /**
   * Expose identity subsystem:
   *   • identity: merchant identity payload
   *   • loading: identity loading state
   *   • error: identity error state
   */
  return { identity, loading, error };
}
