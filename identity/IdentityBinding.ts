import { IdentityEnvelope } from "./IdentityEnvelope";
import { validateIdentityEnvelope } from "./validateIdentityEnvelope";

export function bindIdentity(env: IdentityEnvelope) {
  const validation = validateIdentityEnvelope(env);
  if (!validation.ok) {
    throw new Error(validation.reason ?? "Invalid identity envelope");
  }

  return env;
}
