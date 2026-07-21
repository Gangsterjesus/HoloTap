/**
 * =============================================================================
 * ENGINEERING HEADER — QR SCANNER SCREEN (Consumer-Led Pipeline)
 * =============================================================================
 * Author: Raymond Newton
 * Date: 21 July 2026 — 13:20 BST
 * File: scan-qrc.tsx
 *
 * PURPOSE:
 *   Consumer scans merchant QR code to begin payment session.
 *
 * FLOW ALIGNMENT:
 *   Flow 1 — Consumer scans merchant QR
 *   Flow 2 — Backend verifies QR token → returns merchantId + sessionId
 *   Flow 3 — Consumer navigates to Payment screen
 *
 * =============================================================================
 */

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { API_URL } from "../src/config";

/* ============================================================================
 * SECTION: Component Initialisation
 * ----------------------------------------------------------------------------
 * - Sets up router for navigation
 * - Sets up camera permission state
 * - Sets up `scanned` flag to prevent duplicate scans
 * ========================================================================== */
export default function ScanQR() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  /* ============================================================================
   * SECTION: Camera Permission Handling
   * ----------------------------------------------------------------------------
   * - Requests camera permission on mount
   * - Ensures camera opens automatically without user interaction
   * - Prevents scanning until permission is granted
   * ========================================================================== */
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  /* ============================================================================
   * SECTION: QR Scan Handler
   * ----------------------------------------------------------------------------
   * - Prevents duplicate scans using `scanned` flag
   * - Sends scanned QR token to backend `/session/verify`
   * - Backend returns merchantId + sessionId
   * - Navigates to Payment screen with validated parameters
   * ========================================================================== */
  const handleScan = async (data: string) => {
    if (scanned) return;
    setScanned(true);

    try {
      const response = await fetch(`${API_URL}/session/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push({
          pathname: "/payment",
          params: {
            merchantId: result.merchantId,
            sessionId: result.sessionId,
          },
        } as any);
      } else {
        alert(result.message || "Invalid QR code");
        setScanned(false);
      }
    } catch {
      alert("Network error");
      setScanned(false);
    }
  };

  /* ============================================================================
   * SECTION: Permission Loading State
   * ----------------------------------------------------------------------------
   * - Displays loading indicator while permission state is being resolved
   * ========================================================================== */
  if (!permission) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  /* ============================================================================
   * SECTION: Permission Denied UI
   * ----------------------------------------------------------------------------
   * - Informs user that camera access is required
   * - Prevents scanning until permission is granted
   * ========================================================================== */
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission is required</Text>
      </View>
    );
  }

  /* ============================================================================
   * SECTION: Main Scanner UI
   * ----------------------------------------------------------------------------
   * - Renders full-screen camera view
   * - Handles barcode scanning via `onBarcodeScanned`
   * - Displays instructional text overlay
   * ========================================================================== */
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={({ data }) => handleScan(data)}
      />
      <Text style={styles.scanText}>Scan Merchant QR Code</Text>
    </View>
  );
}

/* ============================================================================
 * SECTION: Stylesheet
 * ----------------------------------------------------------------------------
 * - Dark background for high contrast
 * - Full-screen camera layout
 * - Overlay text for user guidance
 * ========================================================================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  scanText: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 16 },
});
