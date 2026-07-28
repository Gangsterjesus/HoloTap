 /**
 * =============================================================================
 * HOLOTAP MOBILE — PROFILE SCREEN v2 (Engineering Edition)
 * =============================================================================
 * Engineer:      Raymond Newton — HoloTap Engineering Team
 * Assistant:     Copilot Engineering Assistant
 * File:          app/profile.tsx
 * Date:          28 July 2026
 * =============================================================================
 * PURPOSE:
 * Displays merchant profile metadata sourced from the identity subsystem.
 * This screen is part of the internal fintech flow and provides a simple,
 * unstyled overview of merchant information.
 *
 * PROFILE LIFECYCLE:
 *   1. Load merchant identity
 *   2. Display merchant name, ID, status, hologram ID
 *   3. Provide safe fallback states when identity is unavailable
 *
 * VERSION NOTES:
 *   • v2: Rewritten for HoloTap engineering architecture
 *   • Identity‑aware
 *   • No styling, no backend calls
 *   • Pure logic, pure TypeScript
 *
 * FLOW ALIGNMENT:
 *   Flow 1 → Identity
 *   Flow 7 → Settings
 *   Flow 8 → Profile (this screen)
 * =============================================================================
 */

import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useMerchantIdentity } from "../hooks/useMerchantIdentity";

export default function ProfileScreen() {
  const {
    identity,
    loading: identityLoading,
    error: identityError,
  } = useMerchantIdentity();

  /**
   * Identity loading state
   */
  if (identityLoading) {
    return (
      <SafeAreaView>
        <Text>Loading identity…</Text>
      </SafeAreaView>
    );
  }

  /**
   * Identity error state
   */
  if (identityError || !identity) {
    return (
      <SafeAreaView>
        <Text>Unable to load merchant identity.</Text>
      </SafeAreaView>
    );
  }

  /**
   * Main unstyled profile output
   */
  return (
    <SafeAreaView>
      <View>
        <Text>Merchant Profile</Text>
        <Text>Name: {identity.name}</Text>
        <Text>Merchant ID: {identity.id}</Text>
        <Text>Status: {identity.status}</Text>

        {identity.hologramId && (
          <Text>Hologram ID: {identity.hologramId}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
