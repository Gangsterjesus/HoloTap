/**
 * Flow 8 — Org Access Resolver
 * Author: R. Newton (Founder-Architect)
 *
 * Description:
 * Resolves organisation context for the authenticated actor.
 * This resolver attaches:
 *
 *   orgUser   → org_users record
 *   tenant    → org_tenants record
 *
 * Responsibilities:
 * - Bind actor → org_user → tenant
 * - Provide deterministic organisation context to Flow 9+
 *
 * Guarantees:
 * - No destructive operations
 * - No schema mutations
 * - Pure resolution logic only
 */

import { db } from '../db';

export async function resolveOrg(actor: any) {
  if (!actor) return { orgUser: null, tenant: null };

  // Resolve org_users entry for this actor
  const orgUser = await db.orgUsers.findOne({
    id: actor.id,
  });

  if (!orgUser) {
    return { orgUser: null, tenant: null };
  }

  // Resolve tenant for this org user
  const tenant = await db.orgTenants.findOne({
    id: orgUser.tenant_id,
  });

  return {
    orgUser,
    tenant,
  };
}
