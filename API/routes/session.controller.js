import { generateSession } from "../services/session.service.js";

export const createSession = (req, res) => {
  const session = generateSession();
  res.json(session);
};
