/**
 * =============================================================================
 * ENGINEERING HEADER — SYSTEM INFO SCREEN (Consumer-Led Pipeline)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 21 July 2026 — 13:27 BST
 * File: info.tsx
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 *   Provides consumer-facing system metadata including:
 *   - App version
 *   - Build number
 *   - Environment
 *   - Technology stack
 *
 *   This screen is NOT part of the payment pipeline. It is a standalone
 *   diagnostics + metadata screen accessible from the consumer profile.
 *
 * FLOW ALIGNMENT (Consumer Journey):
 *   Flow 1 — Scan QR (scan-qrc.tsx)
 *   Flow 2 — Verify Session
 *   Flow 3 — Enter Payment (payment.tsx)
 *   Flow 4 — Payment Result (payment-result.tsx)
 *   Flow 5 — Consumer Profile + System Info (this screen)
 *
 * ARCHITECTURE NOTES:
 *   - Stateless UI component
 *   - Centralised metadata extraction
 *   - Supports Expo EAS + classic manifest
 *   - Clean fintech UI consistent with HOLOTAP design system
 *
 * TESTING NOTES:
 *   - Validate version metadata
 *   - Validate environment metadata
 *   - Validate scroll behaviour
 * =============================================================================
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

/* ============================================================================
 * SECTION: Metadata Extraction (Scalable + Future-Proof)
 * ----------------------------------------------------------------------------
 * - Supports both expoConfig (EAS builds) and manifest (classic Expo)
 * - Provides fallback values for TM470 stability
 * ========================================================================== */
const appVersion: string =
  Constants.expoConfig?.version ||
  Constants.manifest?.version ||
  "1.0.0";

const buildNumber: string =
  Constants.expoConfig?.extra?.buildNumber ||
  Constants.manifest?.extra?.buildNumber ||
  "N/A";

const environment: string =
  Constants.expoConfig?.extra?.env ||
  Constants.manifest?.extra?.env ||
  "production";

/* ============================================================================
 * SECTION: Section Component (Modular + Typed)
 * ----------------------------------------------------------------------------
 * - Strong typing prevents TS7031 errors
 * - React.ReactNode supports nested JSX
 * - Modular design allows scalable UI expansion
 * ========================================================================== */
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

/* ============================================================================
 * SECTION: Main Component — System Info Screen
 * ----------------------------------------------------------------------------
 * - Stateless
 * - Scrollable for scalability
 * - SafeAreaView prevents clipping on modern devices
 * ========================================================================== */
export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>System Information</Text>

        <View style={styles.card}>
          {/* Mission Section */}
          <Section title="App Purpose">
            <Text style={styles.text}>
              HoloTap enables fast, secure, and frictionless QR-based payments
              for consumers paying merchants. Designed for simplicity,
              reliability, and scalable deployment across UK businesses.
            </Text>
          </Section>

          {/* Version Metadata Section */}
          <Section title="App Version">
            <Text style={styles.text}>Version: {appVersion}</Text>
            <Text style={styles.text}>Build: {buildNumber}</Text>
            <Text style={styles.text}>Environment: {environment}</Text>
          </Section>

          {/* Technology Section */}
          <Section title="Technology Stack">
            <Text style={styles.text}>
              Built with React Native, Expo Router, TypeScript, and a Node.js
              backend. Engineered for modularity, scalability, and secure
              consumer payment flows.
            </Text>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ============================================================================
 * SECTION: Stylesheet — Clean Fintech UI
 * ----------------------------------------------------------------------------
 * - Consistent spacing
 * - Card layout
 * - High readability
 * ========================================================================== */
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
