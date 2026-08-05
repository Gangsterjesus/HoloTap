


/**
 * HoloTapServer
 * Actor Resolver
 * Flow 6 — Identity Resolution Layer
 * Author: R. Newton (Founder‑Architect)
 * Date: 2026‑08‑05
 *
 * Purpose:
 *  - Resolve request‑level identity (founder, qr, anonymous).
 *  - Validate founder access via x-founder-key.
 *  - Validate QR actor identity via x-qr-token.
 *  - Provide unified Actor object for downstream audit logging and access control.
 */


import { db } from "../db";
export async function resolveActor(req: any) {
  const founderKey = req.headers["x-founder-key"];
  if (founderKey && founderKey === process.env.FOUNDER_KEY) {
    return { type: "founder", id: "founder" };
  }

  const token = req.headers["x-qr-token"];
  if (token) {
    const qr = await db.qrTokens.findOne({ token });
    if (qr) return { type: "qr", id: qr.id };
  }

  return { type: "anonymous" };
}
