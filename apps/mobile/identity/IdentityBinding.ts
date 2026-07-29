/**
 * ============================================================
 *  HoloTap Identity — Binding Layer (Mobile Edition)
 *  Engineer: Raymond Newton (E5357171)
 *  Assistant: Copilot Engineering Assistant
 *  Date: 29 July 2026
 *  File: IdentityBinding.ts
 * ============================================================
 *
 *  PURPOSE:
 *  Provides a single binding point for all identity exports.
 *  This allows the mobile app to import identity logic from
 *  one stable location without deep relative paths.
 *
 *  USED BY:
 *    • Flow 6 (Payment Initialisation)
 *    • Flow 7 (Payment Processing)
 *    • Flow 8 (Payment Result)
 *    • Encryption Layer
 *    • QR‑Code Logic
 *
 *  NOTES:
 *  - Mobile‑only identity layer
 *  - Flat, deterministic, no generics
 *  - Pure TypeScript
 * ============================================================
 */

export * from "./IdentityEnvelope";
export * from "./IdentityResponse";
export * from "./buildIdentityEnvelope";
export * from "./deviceIdentity";
export * from "./validateIdentityEnvelope";
