/**
 * =============================================================================
 * ENGINEERING HEADER — PAYMENT RESULT SCREEN (Consumer-Led Pipeline)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 21 July 2026 — 13:24 BST
 * File: payment-result.tsx
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 *   Displays the final payment outcome to the consumer after submitting a bill
 *   payment. Includes hologram animation, backend verification, loading state,
 *   success/failure UI, and strict TypeScript typing.
 *
 * FLOW ALIGNMENT (Consumer Journey):
 *   Flow 1 — Consumer scans merchant QR (scan-qrc.tsx)
 *   Flow 2 — Backend verifies QR token → returns merchantId + sessionId
 *   Flow 3 — Consumer enters payment amount (payment.tsx)
 *   Flow 4 — Payment submission → hologram result (this screen)
 *
 * ARCHITECTURE NOTES:
 *   - Backend verification ensures payment integrity
 *   - Reanimated hologram animation provides visual confirmation
 *   - Auto-return timer navigates consumer back to home screen
 *   - Clean fintech UI consistent with HOLOTAP design system
 *
 * TESTING NOTES:
 *   - Validate backend `/payment/result` endpoint
 *   - Validate hologram animation behaviour
 *   - Validate auto-return timer
 *   - Validate navigation parameters
 * =============================================================================
 */

import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

/* ============================================================================
 * SECTION: TypeScript Types — Route Params (Multi-Currency + Status)
 * ----------------------------------------------------------------------------
 * - Supports future currencies (GBP, BTC, ETH, CBDC, NFT)
 * - Supports blockchain metadata (txHash, nftId)
 * ========================================================================== */
interface RouteParams {
  amount?: string;
  currency?: string;
  merchantId?: string;
  sessionId?: string;
  status?: "success" | "failed";
  txHash?: string;
  nftId?: string;
}

/* ============================================================================
 * SECTION: Currency Metadata — Scalable for Future Currencies
 * ----------------------------------------------------------------------------
 * - Centralised metadata for symbol + decimal precision
 * ========================================================================== */
const currencyMeta: Record<string, { symbol: string; decimals: number }> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  NFT: { symbol: "NFT#", decimals: 0 },
  CBDC: { symbol: "¤", decimals: 2 },
};

/* ============================================================================
 * SECTION: Modular Currency Formatter
 * ----------------------------------------------------------------------------
 * - Converts raw amount + currency into formatted output
 * ========================================================================== */
function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) return "—";
  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numeric = Number(amount);
  if (isNaN(numeric)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

/* ============================================================================
 * SECTION: Main Component — PaymentResult
 * ----------------------------------------------------------------------------
 * - Verifies payment with backend
 * - Displays success/failure UI
 * - Runs hologram animation
 * - Auto-returns consumer to home screen
 * ========================================================================== */
export default function PaymentResult() {
  const router = useRouter();
  const params = useLocalSearchParams() as RouteParams;

  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState<"success" | "failed">(
    params.status ?? "success"
  );

  const formattedAmount = formatCurrency(params.amount, params.currency);

  /* ============================================================================
   * SECTION: Backend Verification — Ensures Payment Integrity
   * ----------------------------------------------------------------------------
   * - Confirms final payment status from backend
   * - Protects against client-side spoofing
   * ========================================================================== */
  useEffect(() => {
    async function verifyPayment() {
      try {
        const res = await fetch(
          `https://api.holotap.co/payment/result?sessionId=${params.sessionId}`
        );
        const json = await res.json();
        setBackendStatus(json.status ?? "failed");
      } catch {
        setBackendStatus("failed");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [params.sessionId]);

  /* ============================================================================
   * SECTION: Hologram Animation — Reanimated v3
   * ----------------------------------------------------------------------------
   * - Pulsing hologram effect
   * - Uses shared values + timing + repeat
   * ========================================================================== */
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 600 }),
      withRepeat(withTiming(0.4, { duration: 800 }), -1, true)
    );
  }, [opacity]);

  const hologramStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: opacity.value + 0.6 }],
  }));

  /* ============================================================================
   * SECTION: Auto-Return Timer — 4 Seconds
   * ----------------------------------------------------------------------------
   * - Returns consumer to home screen
   * - Prevents lingering on result screen
   * ========================================================================== */
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        router.replace("/"); // consumer home screen
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [loading, router]);

  /* ============================================================================
   * SECTION: Loading State
   * ----------------------------------------------------------------------------
   * - Displays verification spinner
   * ========================================================================== */
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={styles.loadingText}>Verifying payment…</Text>
      </SafeAreaView>
    );
  }

  /* ============================================================================
   * SECTION: Failure State
   * ----------------------------------------------------------------------------
   * - Displays failure UI
   * - Shows merchant + session identifiers
   * ========================================================================== */
  if (backendStatus === "failed") {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.failedHeader}>Payment Failed</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Session ID:</Text>
          <Text style={styles.value}>{params.sessionId}</Text>

          <Text style={styles.label}>Merchant ID:</Text>
          <Text style={styles.value}>{params.merchantId}</Text>
        </View>

        <Text style={styles.failedNote}>
          The payment could not be completed.
        </Text>

        <Text style={styles.link} onPress={() => router.replace("/")}>
          Return Home
        </Text>
      </SafeAreaView>
    );
  }

  /* ============================================================================
   * SECTION: Success State — With Hologram Animation
   * ----------------------------------------------------------------------------
   * - Displays formatted amount + metadata
   * - Shows hologram animation
   * ========================================================================== */
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment Successful</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={styles.value}>{formattedAmount}</Text>

        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{params.currency}</Text>

        <Text style={styles.label}>Merchant ID:</Text>
        <Text style={styles.value}>{params.merchantId}</Text>

        <Text style={styles.label}>Session ID:</Text>
        <Text style={styles.value}>{params.sessionId}</Text>

        {params.txHash && (
          <>
            <Text style={styles.label}>Blockchain Tx Hash:</Text>
            <Text style={styles.value}>{params.txHash}</Text>
          </>
        )}

        {params.nftId && (
          <>
            <Text style={styles.label}>NFT Receipt ID:</Text>
            <Text style={styles.value}>{params.nftId}</Text>
          </>
        )}
      </View>

      <Animated.Text style={[styles.hologram, hologramStyle]}>
        ✨ Hologram Activated ✨
      </Animated.Text>

      <Text style={styles.autoReturn}>Returning home…</Text>
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
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#0078FF",
  },
  failedHeader: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#D00000",
  },
  card: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  hologram: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0078FF",
    marginBottom: 20,
  },
  autoReturn: {
    fontSize: 16,
    color: "#777",
  },
  failedNote: {
    fontSize: 18,
    color: "#D00000",
    marginBottom: 40,
  },
  link: {
    fontSize: 18,
    color: "#0078FF",
    fontWeight: "600",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#555",
  },
});
