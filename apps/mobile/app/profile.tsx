/**
 * Engineering Note — HoloTapMobile Flow Alignment
 * Date: 21/07/2026
 * TypeScript strict mode flagged `merchant` as `never` because the state
 * initializer did not specify a type. This prevented access to merchant.name,
 * merchant.email, and merchant.businessId. A Merchant interface and typed
 * useState were introduced to align with HOLOTAP Flow 1 requirements.
 *
 * Key Fixes:
 * - Added Merchant interface
 * - Typed useState<Merchant | null>
 * - Ensured safe rendering with null checks
 *
 * Impact:
 * - Restores correct merchant profile rendering
 * - Eliminates TS2339 errors
 * - Aligns component with HOLOTAPMobile flow structure
 */

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { apiGet } from "../api/client";
import { API_URL } from "../src/config";

// ----------------------
// Merchant Type
// ----------------------
interface Merchant {
  name: string;
  email: string;
  businessId: string;
}

export default function ProfileScreen() {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`${API_URL}/merchant/profile`)
      .then((data: Merchant) => {
        setMerchant(data);
        setLoading(false);
      })
      .catch(() => {
        setMerchant(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Merchant Profile</Text>

      {merchant ? (
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{merchant.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{merchant.email}</Text>

          <Text style={styles.label}>Business ID</Text>
          <Text style={styles.value}>{merchant.businessId}</Text>
        </View>
      ) : (
        <Text style={styles.error}>Unable to load profile</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#333",
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
