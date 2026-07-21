/**
 * =============================================================================
 * ENGINEERING HEADER — TABS LAYOUT (index.tsx)
 * =============================================================================
 * Engineer: Raymond Newton (E5357171)
 * Assistant: Copilot Engineering Assistant
 * Date: 21 July 2026 — 15:51 BST
 * File: app/(tabs)/index.tsx
 * © 2026 HoloTap Technologies Ltd. All rights reserved.
 *
 * PURPOSE:
 *   Provides the tabbed navigation shell for the developer diagnostics suite.
 *   This layout is used only in the engineering/debugging environment and is
 *   not part of the consumer-facing fintech flow.
 *
 * FLOW ALIGNMENT (Developer Journey):
 *   Flow D1 — Developer opens diagnostics tab
 *   Flow D2 — Developer checks API, device, runtime, and session pipeline
 *   Flow D3 — Developer validates QR → Session → Payment pipeline
 *
 * ARCHITECTURE NOTES:
 *   - Expo Router v6 tab layout
 *   - Each tab is a screen inside /app/(tabs)
 *   - Diagnostics screen lives at /app/(tabs)/diagnostics.tsx
 *
 * TESTING NOTES:
 *   - Confirm tab loads correctly
 *   - Confirm diagnostics screen renders
 *   - Confirm navigation stack is isolated from consumer flow
 * =============================================================================
 */

// @ts-ignore: expo-router types are unavailable in this environment
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="diagnostics"
        options={{
          title: "Diagnostics",
        }}
      />
    </Tabs>
  );
}
