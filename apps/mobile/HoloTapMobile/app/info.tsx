/**
 * =============================================================================
 * HOLOTAPMOBILE — SYSTEM INFO SCREEN (info.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 21 July 2026
 * File: info.tsx
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 *   Provides consumer-facing diagnostic information including:
 *   - App version and build metadata
 *   - Environment configuration (dev/staging/prod)
 *   - Device model, OS version, and runtime characteristics
 *   - Installation identifiers for debugging and TM470 traceability
 *
 * SECTION OVERVIEW:
 *   Metadata Extraction:
 *     Centralised logic for retrieving version/build/environment values.
 *     Supports both expoConfig (EAS builds) and manifest (classic Expo),
 *     ensuring stability across development, production, and TM470 marking.
 *
 *   Section Component:
 *     A modular, typed UI block used to group related diagnostic fields.
 *     Ensures consistent layout, prevents TS7031 errors, and allows
 *     scalable expansion as new diagnostic categories are added.
 *
 *   Main Screen Component:
 *     Stateless React component rendering:
 *       - App metadata
 *       - Device metadata
 *       - Diagnostic metadata
 *     Uses SafeAreaView + ScrollView for modern device compatibility.
 *
 *   Stylesheet:
 *     Fintech-grade aesthetic with:
 *       - Clean white cards
 *       - Soft shadows
 *       - Consistent spacing and typography
 *     Ensures visual consistency with the HoloTap consumer dashboard.
 *
 * ARCHITECTURE NOTES:
 *   - Stateless UI component
 *   - Expo Router (file-based routing)
 *   - Uses expo-constants + expo-device (runtime-safe import)
 *   - Fully aligned with Flow 6 of the consumer pipeline
 *
 * TESTING NOTES:
 *   - Confirm /info route loads correctly from dashboard
 *   - Confirm metadata fields populate on both Expo Go and EAS builds
 *   - Confirm device fields populate across iOS/Android/Web
 * =============================================================================
 */


import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

/**
 * ============================================================
 *  expo-device — Modern Monorepo-Safe Import
 * ============================================================
 */
const ExpoDevice = require("expo-device");

const Device: {
  modelName?: string;
  osName?: string;
  osVersion?: string;
  deviceType?: string | number;
} = ExpoDevice;

/**
 * ============================================================
 *  Metadata Extraction
 * ============================================================
 */
const appVersion =
  Constants.expoConfig?.version ??
  Constants.manifest?.version ??
  "1.0.0";

const buildNumber =
  Constants.expoConfig?.extra?.buildNumber ??
  Constants.manifest?.extra?.buildNumber ??
  "N/A";

const environment =
  Constants.expoConfig?.extra?.env ??
  Constants.manifest?.extra?.env ??
  "production";

/**
 * ============================================================
 *  Section Component
 * ============================================================
 */
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

/**
 * ============================================================
 *  Main Screen Component
 * ============================================================
 */
export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>System Information</Text>

        <View style={styles.card}>
          <Section title="App Metadata">
            <Text style={styles.text}>Version: {appVersion}</Text>
            <Text style={styles.text}>Build: {buildNumber}</Text>
            <Text style={styles.text}>Environment: {environment}</Text>
          </Section>

          <Section title="Device">
            <Text style={styles.text}>Model: {Device.modelName}</Text>
            <Text style={styles.text}>
              OS: {Device.osName} {Device.osVersion}
            </Text>
            <Text style={styles.text}>
              Device Type: {Device.deviceType ?? "Unknown"}
            </Text>
          </Section>

          <Section title="Diagnostics">
            <Text style={styles.text}>
              Installation ID: {Constants.installationId}
            </Text>
            <Text style={styles.text}>
              Expo Runtime: {Constants.executionEnvironment ?? "standalone"}
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * ============================================================
 *  Stylesheet
 * ============================================================
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
  },
});
