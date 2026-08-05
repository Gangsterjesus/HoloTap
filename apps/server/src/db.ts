/**
 * HoloTapServer
 * DB Adapter (Prisma-backed)
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// --- Audit Logs -------------------------------------------------------------

async function insertAuditLog(event: any) {
  return prisma.audit_logs.create({
    data: {
      actor_id: event.actor_id ?? null,
      actor_type: event.actor_type ?? null,
      action: event.action,
      metadata: event.metadata ?? null,
    },
  });
}

// --- QR Codes ---------------------------------------------------------------

async function insertQrCode(data: any) {
  return prisma.qr_codes.create({ data });
}

async function findQrCode(where: any) {
  return prisma.qr_codes.findFirst({ where });
}

async function updateQrCode(where: any, update: any) {
  return prisma.qr_codes.updateMany({
    where,
    data: update,
  });
}

// --- Unified DB Adapter (matches your repos) --------------------------------

export const db = {
  auditLogs: {
    insert: insertAuditLog,
  },

  qrTokens: {
    insert: insertQrCode,
    findOne: findQrCode,
    updateOne: updateQrCode,
  },
};
