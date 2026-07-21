/**
 * =============================================================================
 * ENGINEERING HEADER — PAYMENT SCREEN (Consumer-Led Pipeline)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 21 July 2026 — 13:22 BST
 * File: payment.tsx
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 *   Consumer enters the bill amount and optional description after scanning the
 *   merchant QR code. This screen submits the payment request to the backend and
 *   transitions to the hologram-based Payment Result screen.
 *
 * FLOW ALIGNMENT (Consumer Journey):
 *   Flow 1 — Consumer scans merchant QR (scan-qrc.tsx)
 *   Flow 2 — Backend verifies QR token → returns merchantId + sessionId
 *   Flow 3 — Consumer enters payment amount (this screen)
 *   Flow 4 — Payment submission → hologram result (payment-result.tsx)
 *
 * ARCHITECTURE NOTES:
 *   - Strong TypeScript typing for route params + backend response
 *   - Modular payment helper for clean separation of concerns
 *   - Deterministic lifecycle with loading state
 *   - Expo Router typed navigation (Href)
 *   - Clean fintech UI consistent with HOLOTAP design system
 *
 * ENGINEERING NOTES:
 *   - Input validation prevents invalid numeric amounts
 *   - Backend errors surfaced via alert for development clarity
 *   - Navigation parameters passed safely using typed Href
 *   - No business logic inside UI components
 *
 * TESTING NOTES:
 *   - Validate correct merchantId/sessionId propagation
 *   - Validate numeric input behaviour
 *   - Validate backend `/payment` endpoint response
 *   - Validate navigation to `/payment-result`
 * =============================================================================
 */

import React, { useState } from "react";
import { Text, TextInput, Button, StyleSheet, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter, type Href } from "expo-router";
import { apiPost } from "../api/client";

/* ============================================================================
 * SECTION: TypeScript Types — Route Params + Backend Response
 * ----------------------------------------------------------------------------
 * - RouteParams: merchantId + sessionId passed from QR scanner
 * - PaymentResponse: backend response contract for payment submission
 * ========================================================================== */
interface RouteParams {
  merchantId?: string;
  sessionId?: string;
}

interface PaymentResponse {
  success: boolean;
  message?: string;
}

/* ============================================================================
 * SECTION: Modular Payment Helper — Clean & Testable
 * ----------------------------------------------------------------------------
 * - Encapsulates backend POST request
 * - Ensures UI remains free of business logic
 * ========================================================================== */
async function submitPayment(
  merchantId: string,
  sessionId: string,
  amount: number,
  description: string
): Promise<PaymentResponse> {
  return apiPost("/payment", {
    merchantId,
    sessionId,
    amount,
    description,
  });
}

/* ============================================================================
 * SECTION: Main Component — Payment Screen
 * ----------------------------------------------------------------------------
 * - Retrieves merchantId + sessionId from router params
 * - Manages input + loading state
 * - Submits payment to backend
 * - Navigates to Payment Result screen
 * ========================================================================== */
export default function Payment() {
  const router = useRouter();
  const { merchantId, sessionId } = useLocalSearchParams() as RouteParams;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /* ============================================================================
   * SECTION: Handle Payment Submission
   * ----------------------------------------------------------------------------
   * - Validates required params
   * - Validates numeric amount
   * - Calls modular payment helper
   * - Navigates to Payment Result on success
   * ========================================================================== */
  async function handlePay() {
    if (!merchantId || !sessionId) {
      Alert.alert("Missing Data", "Merchant or session ID is missing.");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Invalid Amount", "Please enter a valid numeric amount.");
      return;
    }

    setLoading(true);

    try {
      const result = await submitPayment(
        merchantId,
        sessionId,
        Number(amount),
        description
      );

      if (result.success) {
        const next: Href = {
          pathname: "/payment-result",
          params: {
            amount,
            merchantId,
            sessionId,
          },
        };

        router.push(next);
        return;
      }

      Alert.alert("Payment Failed", result.message ?? "Unable to process payment.");
    } catch {
      Alert.alert("Network Error", "Unable to reach the payment server.");
    } finally {
      setLoading(false);
    }
  }

  /* ============================================================================
   * SECTION: Main UI — Fintech Layout
   * ----------------------------------------------------------------------------
   * - Displays merchant + session identifiers
   * - Provides amount + description inputs
   * - Provides payment submission button
   * ========================================================================== */
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Merchant ID: {merchantId}</Text>
        <Text style={styles.label}>Session ID: {sessionId}</Text>

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
        />

        <Button
          title={loading ? "Processing..." : "Pay Now"}
          onPress={handlePay}
          disabled={loading}
        />
      </View>
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
    padding: 20,
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    fontSize: 28,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
    fontSize: 16,
  },
});
