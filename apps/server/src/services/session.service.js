import { generateId } from "../utils/id.js";

const sessions = new Map();

export const sessionService = {
  createSession({ role, merchantId }) {
    const id = generateId();
    const session = {
      id,
      role,
      merchantId: role === "merchant" ? merchantId : null,
      createdAt: new Date().toISOString()
    };
    sessions.set(id, session);
    return session;
  },

  getSession(id) {
    return sessions.get(id) || null;
  }
};
