import { generateSession } from "../services/session.service.js";




export const createSession = (req, res) => {
  const session = generateSession();

  return res.status(201).json({
    message: "Session created successfully",
    session
  });
};
