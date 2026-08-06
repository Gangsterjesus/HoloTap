/**
 * Flow 9 — Permission Enforcement Layer
 * Author: R. Newton (Founder-Architect)
 *
 * Description:
 * Provides deterministic access-control guards for all protected routes.
 * This layer sits immediately after Flow 8 (Org Access Middleware) and
 * enforces role, permission, tenant, session, and org-user requirements.
 *
 * Guarantees:
 * - No destructive operations
 * - No schema mutations
 * - Pure enforcement logic only
 */

import { Request, Response, NextFunction } from 'express';

// ---------------------------------------------------------------------------
// Require Active Session
// ---------------------------------------------------------------------------

export function requireSession(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;

  if (!session) {
    return res.status(401).json({
      ok: false,
      error: 'SESSION_REQUIRED',
    });
  }

  return next();
}

// ---------------------------------------------------------------------------
// Require Org User
// ---------------------------------------------------------------------------

export function requireOrgUser(req: Request, res: Response, next: NextFunction) {
  const orgUser = (req as any).orgUser;

  if (!orgUser) {
    return res.status(403).json({
      ok: false,
      error: 'ORG_USER_REQUIRED',
    });
  }

  return next();
}

// ---------------------------------------------------------------------------
// Require Tenant
// ---------------------------------------------------------------------------

export function requireTenant(req: Request, res: Response, next: NextFunction) {
  const tenant = (req as any).tenant;

  if (!tenant) {
    return res.status(403).json({
      ok: false,
      error: 'TENANT_REQUIRED',
    });
  }

  return next();
}

// ---------------------------------------------------------------------------
// Require Role
// ---------------------------------------------------------------------------

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentRole = (req as any).orgUser?.role;

    if (currentRole !== role) {
      return res.status(403).json({
        ok: false,
        error: 'ROLE_REQUIRED',
        required: role,
        actual: currentRole ?? null,
      });
    }

    return next();
  };
}

// ---------------------------------------------------------------------------
// Require Permission
// ---------------------------------------------------------------------------

export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions = (req as any).permissions ?? [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        ok: false,
        error: 'PERMISSION_REQUIRED',
        required: permission,
      });
    }

    return next();
  };
}
