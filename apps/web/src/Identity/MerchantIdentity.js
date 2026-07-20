// src/identity/MerchantIdentity.js

import { encryptMerchantData, decryptMerchantData, deriveKey } from "./MerchantKeys";

const IDENTITY_KEY = "ht_merchant_identity";

// Save encrypted merchant identity
export async function saveMerchantIdentity(identity, passphrase) {
  const key = await deriveKey(passphrase);
  const encrypted = await encryptMerchantData(identity, key);
  localStorage.setItem(IDENTITY_KEY, JSON.stringify(encrypted));
}

// Load and decrypt merchant identity
export async function loadMerchantIdentity(passphrase) {
  const raw = localStorage.getItem(IDENTITY_KEY);
  if (!raw) return null;

  const key = await deriveKey(passphrase);
  const encrypted = JSON.parse(raw);

  return decryptMerchantData(encrypted, key);
}

// Clear identity
export function clearMerchantIdentity() {
  localStorage.removeItem(IDENTITY_KEY);
}
