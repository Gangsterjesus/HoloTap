/**
 * HoloTapServer
 * Actor Model
 * Flow 6 — Identity Resolution Layer
 * Author: R. Newton (Founder‑Architect)
 * Date: 2026‑08‑05
 *
 * Purpose:
 *  - Define the unified Actor identity shape for all backend flows.
 *  - Support founder, QR-token, and anonymous actors.
 *  - Provide a strongly-typed identity object consumed by middleware and audit logs.
 */

export type Actor =
  | { type: "founder"; id: string }
  | { type: "qr"; id: string }
  | { type: "anonymous" };
