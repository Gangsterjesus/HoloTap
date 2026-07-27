export type IdentityEnvelope = {
  deviceId: string;
  issuedAt: number;
  payload: Record<string, unknown>;
};
