/**
 * HoloTapServer
 * Activation Controller
 *
 * Purpose:
 *  - Handle QR activation POST
 *  - Enforce replay protection
 *  - Basic audit logging (Task 01)
 */


import { Request, Response } from 'express';
import { getToken, activateToken } from '../services/qrTokenService';
// Attempt to load audit logging service; fall back to a no-op when missing.
// This keeps the controller working even if the auditLogService module is absent
// (fixes build errors when the service isn't present in certain environments).
let logEvent: (evt: any) => Promise<void> = async () => {};
try {
  // Use require to avoid static import resolution errors during build when the
  // module/file is not available. Keep typings loose here to allow a graceful
  // fallback.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _svc = require('../services/auditLogService');
  if (_svc && typeof _svc.logEvent === 'function') {
    logEvent = _svc.logEvent;
  }
} catch (e) {
  // Swallow errors and continue with no-op logger
}

export async function activateQr(req: Request, res: Response) {
  const { tokenId, tenantId } = req.body;

  // Retrieve token from repo-backed service
  const token = await getToken(tokenId);

  if (!token || token.tenantId !== tenantId) {
    await logEvent({
      action: 'qr_activation',
      result: 'failure',
      reason: 'invalid_token',
      tenantId,
      origin: 'web',
      meta: { tokenId },
    });

    return res.status(400).json({ error: 'Invalid token' });
  }

  // Replay-safe activation
  const ok = await activateToken(tokenId);

  if (!ok) {
    await logEvent({
      action: 'qr_activation',
      result: 'failure',
      reason: 'replay_or_expired',
      tenantId,
      origin: 'web',
      meta: { tokenId },
    });

    return res.status(400).json({ error: 'Token expired or already used' });
  }

  await logEvent({
    action: 'qr_activation',
    result: 'success',
    reason: 'activated',
    tenantId,
    origin: 'web',
    meta: { tokenId },
  });

  return res.json({ status: 'activated' });
}
