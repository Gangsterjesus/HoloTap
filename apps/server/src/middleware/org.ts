/**
 * Flow 8 — Org Access Middleware
 * Author: R. Newton (Founder-Architect)
 *
 * Description:
 * Attaches organisation context to the incoming request.
 * This middleware sits immediately after Flow 7 (Session Middleware)
 * and ensures that every request has deterministic access to:
 *
 *   req.orgUser   (org_users record)
 *   req.tenant    (org_tenants record)
 *   req.permissions (role-derived permission set)
 *
 * Responsibilities:
 * - Resolve org_user from actor
 * - Resolve tenant from org_user
 * - Bind permissions based on role
 *
 * Guarantees:
 * - No destructive operations
 * - No schema mutations
 * - Pure resolution logic only
 */

import { Request, Response, NextFunction } from 'express';
import { resolveOrg } from '../identity/resolveOrg';

export async function orgMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const actor = (req as any).actor;

    if (!actor) {
      (req as any).orgUser = null;
      (req as any).tenant = null;
      (req as any).permissions = [];
      return next();
    }

    const { orgUser, tenant } = await resolveOrg(actor);

    (req as any).orgUser = orgUser ?? null;
    (req as any).tenant = tenant ?? null;

    // Role → Permission mapping (deterministic)
    const role = orgUser?.role ?? null;

    let permissions: string[] = [];

    switch (role) {
      case 'admin':
        permissions = ['manage_users', 'manage_tenants', 'view_all', 'edit_all'];
        break;

      case 'manager':
        permissions = ['manage_users', 'view_all'];
        break;

      case 'staff':
        permissions = ['view_assigned'];
        break;

      case 'mobile_user':
        permissions = ['view_self'];
        break;

      default:
        permissions = [];
    }

    (req as any).permissions = permissions;

    return next();
  } catch (err) {
    console.error('Flow 8 Org Middleware Error:', err);

    (req as any).orgUser = null;
    (req as any).tenant = null;
    (req as any).permissions = [];

    return next();
  }
}
