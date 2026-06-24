import { generateSignedToken } from "../utils/token.util.js";

export async function createQrSession(merchantId) {
  const expiresIn = 120; // seconds

  const token = generateSignedToken({
    merchantId,
    expiresIn,
    createdAt: Date.now()
  });

  return {
    merchantId,
    token,
    expiresIn,
    createdAt: Date.now()
  };
}
