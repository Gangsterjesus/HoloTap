import { generateId } from "../utils/id.js";

const merchants = new Map();

export const merchantService = {
  createMerchant(data) {
    const id = generateId();
    const merchant = { id, ...data };
    merchants.set(id, merchant);
    return merchant;
  },

  getMerchant(id) {
    return merchants.get(id) || null;
  }
};
