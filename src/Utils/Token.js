/**
 * ============================================================
 *  HoloTap — Token Encryption, Integrity & Verification Utility
 *  Engineers: Raymond Newton, HoloTap Engineering Team
 *  Author: Raymond Newton
 *  Date: 02 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides secure, single‑use, time‑limited, tamper‑evident token
 *  generation and validation for HoloTap QR-based payment flows.
 *
 *  Security Features:
 *  - AES encryption (confidentiality)
 *  - HMAC-SHA256 (integrity + tamper detection)
 *  - Nonce per token (replay resistance support)
 *  - Token ID + revocation list (merchant invalidation)
 *  - Versioned token format (future‑proofing)
 *  - 5-minute TTL (configurable)
 *
 *  Token Structure (v1):
 *  {
 *    version: "v1",
 *    nonce: string,
 *    token: string,   // AES ciphertext
 *    hmac: string     // HMAC-SHA256 over version + nonce + token
 *  }
 *
 * ============================================================
 */

import CryptoJS from "crypto-js";

const TOKEN_SECRET_KEY = "holotap-secret-key";
const TOKEN_HMAC_KEY = "holotap-hmac-key";
const TOKEN_TTL_MILLISECONDS = 5 * 60 * 1000; // 5 minutes
const TOKEN_VERSION = "v1";

const NONCE_STORE_KEY = "ht_used_nonces";
const REVOKED_TOKENS_KEY = "ht_revoked_tokens";

/* ============================================================
 *  Core Helpers
 * ============================================================
 */

function generateNonce() {
  return CryptoJS.lib.WordArray.random(16).toString(); // 128-bit nonce
}

function computeHmac({ version, nonce, token }) {
  const data = `${version}|${nonce}|${token}`;
  return CryptoJS.HmacSHA256(data, TOKEN_HMAC_KEY).toString();
}

/* ============================================================
 *  Nonce Blacklist (Replay Protection)
 * ============================================================
 */

function loadUsedNonces() {
  try {
    return JSON.parse(localStorage.getItem(NONCE_STORE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsedNonces(list) {
  localStorage.setItem(NONCE_STORE_KEY, JSON.stringify(list));
}

function markNonceUsed(nonce) {
  const list = loadUsedNonces();
  const now = Date.now();

  const filtered = list.filter(
    (entry) => now - entry.usedAt < TOKEN_TTL_MILLISECONDS
  );

  filtered.push({ nonce, usedAt: now });
  saveUsedNonces(filtered);
}

function isNonceUsed(nonce) {
  const list = loadUsedNonces();
  const now = Date.now();

  return list.some(
    (entry) => entry.nonce === nonce && now - entry.usedAt < TOKEN_TTL_MILLISECONDS
  );
}

/* ============================================================
 *  Token Revocation List
 * ============================================================
 */

function loadRevokedTokens() {
  try {
    return JSON.parse(localStorage.getItem(REVOKED_TOKENS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRevokedTokens(list) {
  localStorage.setItem(REVOKED_TOKENS_KEY, JSON.stringify(list));
}

export function revokeTokenId(id) {
  const list = loadRevokedTokens();
  const now = Date.now();

  const filtered = list.filter(
    (entry) => now - entry.revokedAt < TOKEN_TTL_MILLISECONDS
  );

  filtered.push({ id, revokedAt: now });
  saveRevokedTokens(filtered);
}

function isTokenIdRevoked(id) {
  const list = loadRevokedTokens();
  const now = Date.now();

  return list.some(
    (entry) => entry.id === id && now - entry.revokedAt < TOKEN_TTL_MILLISECONDS
  );
}

/* ============================================================
 *  Public API
 * ============================================================
 */

export async function encryptPayload(payload) {
  const tokenWrapper = {
    id: CryptoJS.lib.WordArray.random(16).toString(), // token ID for revocation
    payload,
    issuedAt: Date.now()
  };

  const json = JSON.stringify(tokenWrapper);
  const ciphertext = CryptoJS.AES.encrypt(json, TOKEN_SECRET_KEY).toString();

  const nonce = generateNonce();

  const tokenObject = {
    version: TOKEN_VERSION,
    nonce,
    token: ciphertext
  };

  const hmac = computeHmac(tokenObject);

  return {
    version: TOKEN_VERSION,
    nonce,
    token: ciphertext,
    hmac
  };
}

export async function decryptPayload(tokenObject) {
  try {
    // 1. Basic shape + version check
    if (!tokenObject || tokenObject.version !== TOKEN_VERSION) {
      throw new Error("Unsupported token version");
    }

    const { version, nonce, token, hmac } = tokenObject;

    if (!version || !nonce || !token || !hmac) {
      throw new Error("Malformed token");
    }

    // 2. HMAC verification (integrity / tamper detection)
    const expectedHmac = computeHmac({ version, nonce, token });
    if (expectedHmac !== hmac) {
      throw new Error("Token integrity check failed");
    }

    // 3. Replay protection (nonce blacklist)
    if (isNonceUsed(nonce)) {
      throw new Error("Token already used");
    }

    // 4. AES decryption
    const bytes = CryptoJS.AES.decrypt(token, TOKEN_SECRET_KEY);
    const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedJson) {
      throw new Error("Decryption failed");
    }

    const tokenWrapper = JSON.parse(decryptedJson);

    // 5. TTL enforcement
    const now = Date.now();
    const age = now - tokenWrapper.issuedAt;

    if (age > TOKEN_TTL_MILLISECONDS) {
      throw new Error("Token expired");
    }

    // 6. Revocation check
    if (tokenWrapper.id && isTokenIdRevoked(tokenWrapper.id)) {
      throw new Error("Token revoked");
    }

    // 7. Mark nonce as used (single-use token)
    markNonceUsed(nonce);

    return tokenWrapper.payload;
  } catch (error) {
    console.error("Token decryption error:", error);
    throw new Error("Invalid or expired token");
  }
}
