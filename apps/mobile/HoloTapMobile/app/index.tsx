/**
 * =============================================================================
 * ENGINEERING HEADER — CONSUMER HOME SCREEN (index.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 21 July 2026 — 13:59 BST
 * File: index.tsx
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 *   Entry point of the HoloTapMobile consumer app. Provides a clean fintech
 *   dashboard that routes the user into the QR scanning flow, profile screen,
 *   and system information screen.
 *
 * FLOW ALIGNMENT (Consumer Journey):
 *   Flow 1 — Consumer opens app → lands on this dashboard
 *   Flow 2 — Consumer scans merchant QR (scan-qrc.tsx)
 *   Flow 3 — Backend verifies QR token
 *   Flow 4 — Consumer enters payment amount (payment.tsx)
 *   Flow 5 — Payment result hologram (payment-result.tsx)
 *   Flow 6 — Profile + System Info (profile.tsx + info.tsx)
 *
 * ARCHITECTURE NOTES:
 *   - Expo Router entry point
 *   - Stateless UI component
 *   - Fintech card layout
 *   - Typed navigation using Href object
 *
 * TESTING NOTES:
 *   - Confirm dashboard loads as initial screen
 *   - Confirm navigation to /profile and /info
 * =============================================================================
 */

import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import styles from "./styles";

export default function HomeDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>

        {/* Profile */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push({ pathname: "/profile" })}
        >
          <Text style={styles.cardTitle}>Profile</Text>
          <Text style={styles.cardText}>Manage your account details.</Text>
        </TouchableOpacity>

        {/* System Info */}
        <TouchableOpacity
          style={styles.card}
          // cast to any to satisfy typed router pathname union for routes defined elsewhere
          onPress={() => router.push({ pathname: "/info" } as any)}
        >
          <Text style={styles.cardTitle}>System Info</Text>
          <Text style={styles.cardText}>
            App version, environment, and diagnostics.
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
