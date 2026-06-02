// src/identity/MerchantTagStore.js

const TAG_KEY = "ht_tagID";

export function saveTagID(tagID) {
  localStorage.setItem(TAG_KEY, tagID);
}

export function getTagID() {
  return localStorage.getItem(TAG_KEY);
}

export function clearTagID() {
  localStorage.removeItem(TAG_KEY);
}
