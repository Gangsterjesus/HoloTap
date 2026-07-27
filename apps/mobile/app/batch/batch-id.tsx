/**
 * =============================================================================
 * HOLOTAP MOBILE — SETTLEMENT BATCH DETAIL SCREEN (batch-id.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 02 July 2026
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 * =============================================================================
 */


import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

/**
 * Local inline styles (no external stylesheet)
 */
const batchStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  loadingText: { marginTop: 12, textAlign: "center", color: "#333" },
  errorHeader: { fontSize: 18, fontWeight: "600", color: "#c00" },
  errorNote: { marginTop: 8, color: "#666" },
  link: { marginTop: 16, color: "#0078FF" },
  txCard: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
  },
  txLabel: { fontSize: 12, color: "#666" },
  txValue: { fontSize: 14, color: "#111", marginBottom: 6 },
  statusSuccess: { color: "green" },
  statusFailed: { color: "red" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { padding: 12, backgroundColor: "#fff", marginBottom: 12 },
  label: { fontSize: 12, color: "#666" },
  value: { fontSize: 14, color: "#111", marginBottom: 6 },
  subHeader: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
  listContent: { paddingBottom: 40 },
});

/**
 * Types
 */
interface RouteParams {
  batchId?: string;
}

interface BatchItem {
  txId: string;
  amount: string;
  currency: string;
  merchantId: string;
  sessionId: string;
  status: "success" | "failed";
}

interface BatchPayload {
  batchId: string;
  currency: string;
  totalAmount: string;
  itemCount: number;
  timestamp: string;
  items: BatchItem[];
}

/**
 * Currency formatting
 */
const currencyMeta: Record<string, { symbol: string; decimals: number }> = {
  GBP: { symbol: "£", decimals: 2 },
  BTC: { symbol: "₿", decimals: 8 },
  ETH: { symbol: "Ξ", decimals: 8 },
  BRICS: { symbol: "Ƀ", decimals: 4 },
  CBDC: { symbol: "¤", decimals: 2 },
};

function formatCurrency(amount?: string, currency?: string): string {
  if (!amount || !currency) return "—";
  const meta = currencyMeta[currency] ?? currencyMeta.GBP;
  const numeric = Number(amount);
  if (isNaN(numeric)) return `${meta.symbol}${amount}`;
  return `${meta.symbol}${numeric.toFixed(meta.decimals)}`;
}

/**
 * Main Component
 */
export default function BatchDetail() {
  const router = useRouter();
  const { batchId } = useLocalSearchParams() as RouteParams;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [batch, setBatch] = useState<BatchPayload | null>(null);

  useEffect(() => {
    async function loadBatch() {
      try {
        const res = await fetch(`https://api.holotap.co/batch/${batchId}`);
        const json = await res.json();
        setBatch(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadBatch();
  }, [batchId]);

  if (loading) {
    return (
      <SafeAreaView style={batchStyles.container}>
        <ActivityIndicator size="large" color="#0078FF" />
        <Text style={batchStyles.loadingText}>Loading batch details…</Text>
      </SafeAreaView>
    );
  }

  if (error || !batch) {
    return (
      <SafeAreaView style={batchStyles.container}>
        <Text style={batchStyles.errorHeader}>Unable to load batch</Text>
        <Text style={batchStyles.errorNote}>
          Something went wrong while fetching batch data.
        </Text>

        <Text
          style={batchStyles.link}
          onPress={() => router.replace("/settlement")}
        >
          Return to Settlement Overview
        </Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: BatchItem }) => (
    <View style={batchStyles.txCard}>
      <Text style={batchStyles.txLabel}>Transaction ID:</Text>
      <Text style={batchStyles.txValue}>{item.txId}</Text>

      <Text style={batchStyles.txLabel}>Amount:</Text>
      <Text style={batchStyles.txValue}>
        {formatCurrency(item.amount, item.currency)}
      </Text>

      <Text style={batchStyles.txLabel}>Status:</Text>
      <Text
        style={[
          batchStyles.txValue,
          item.status === "success"
            ? batchStyles.statusSuccess
            : batchStyles.statusFailed,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={batchStyles.container}>
      <Text style={batchStyles.header}>Batch Details</Text>

      <View style={batchStyles.card}>
        <Text style={batchStyles.label}>Batch ID:</Text>
        <Text style={batchStyles.value}>{batch.batchId}</Text>

        <Text style={batchStyles.label}>Total Amount:</Text>
        <Text style={batchStyles.value}>
          {formatCurrency(batch.totalAmount, batch.currency)}
        </Text>

        <Text style={batchStyles.label}>Currency:</Text>
        <Text style={batchStyles.value}>{batch.currency}</Text>

        <Text style={batchStyles.label}>Items:</Text>
        <Text style={batchStyles.value}>{batch.itemCount}</Text>

        <Text style={batchStyles.label}>Timestamp:</Text>
        <Text style={batchStyles.value}>{batch.timestamp}</Text>
      </View>

      <Text style={batchStyles.subHeader}>Transactions</Text>

      <FlatList
        data={batch.items}
        keyExtractor={(item) => item.txId}
        renderItem={renderItem}
        contentContainerStyle={batchStyles.listContent}
      />

      <Text
        style={batchStyles.link}
        onPress={() => router.replace("/settlement")}
      >
        Return to Settlement Overview
      </Text>
    </SafeAreaView>
  );
}
