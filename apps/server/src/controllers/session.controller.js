import { sessionService } from "../services/session.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

export function createSession(req, res, next) {
  try {
    const { role, merchantId } = req.body;
    const session = sessionService.createSession({ role, merchantId });
    return sendSuccess(res, 201, "Session created", session);
  } catch (err) {
    next(err);
  }
}

export function getSession(req, res, next) {
  try {
    const session = sessionService.getSession(req.params.sessionId);
    if (!session) return sendError(res, 404, "Session not found");
    return sendSuccess(res, 200, "Session retrieved", session);
  } catch (err) {
    next(err);
  }
}
