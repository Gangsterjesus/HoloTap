// src/identity/MerchantKeys.js

// Derive a crypto key from a passphrase (PIN, device secret, etc.)
export async function deriveKey(passphrase) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("HoloTapMerchantSalt"),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt merchant identity
export async function encryptMerchantData(data, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();

  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(JSON.stringify(data))
  );

  return {
    iv: Array.from(iv),
    cipher: Array.from(new Uint8Array(cipher))
  };
}

// Decrypt merchant identity
export async function decryptMerchantData(payload, key) {
  const { iv, cipher } = payload;

  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    key,
    new Uint8Array(cipher)
  );

  const dec = new TextDecoder();
  return JSON.parse(dec.decode(plain));
}
