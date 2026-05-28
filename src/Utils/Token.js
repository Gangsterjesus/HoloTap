// src/Utils/Token.js

import CryptoJS from "crypto-js";

const TOKEN_SECRET_KEY = "holotap-secret-key";
const TOKEN_TTL_MILLISECONDS = 5 * 60 * 1000; // 5 minutes

export async function encryptPayload(payload) {
  const tokenWrapper = {
    payload,
    issuedAt: Date.now()
  };

  const json = JSON.stringify(tokenWrapper);
  const ciphertext = CryptoJS.AES.encrypt(json, TOKEN_SECRET_KEY).toString();

  return {
    token: ciphertext
  };
}

export async function decryptPayload(tokenObject) {
  try {
    const bytes = CryptoJS.AES.decrypt(tokenObject.token, TOKEN_SECRET_KEY);
    const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedJson) {
      throw new Error("Decryption failed");
    }

    const tokenWrapper = JSON.parse(decryptedJson);

    const now = Date.now();
    const age = now - tokenWrapper.issuedAt;

    if (age > TOKEN_TTL_MILLISECONDS) {
      throw new Error("Token expired");
    }

    return tokenWrapper.payload;
  } catch (error) {
    console.error("Token decryption error:", error);
    throw new Error("Invalid or expired token");
  }
}
