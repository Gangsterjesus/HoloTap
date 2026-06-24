import crypto from "crypto";

const SECRET = process.env.QR_SECRET || "DEV_SECRET_CHANGE_ME";

export function generateSignedToken(payload) {
  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(base64)
    .digest("base64url");

  return `${base64}.${signature}`;
}
