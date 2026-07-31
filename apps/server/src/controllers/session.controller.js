import crypto from "crypto";

// In‑memory session store
const sessions = new Map();

// Utility: generate deterministic session IDs
function generateSessionId() {
  return crypto.randomUUID();
}

// Utility: success response
function sendSuccess(res, status, message, data) {
  return res.status(status).json({
    success: true,
    message,
    data
  });
}

// Utility: error response
function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    message
  });
}

// CREATE SESSION
export function createSession(req, res, next) {
  try {
    const { role, merchantId } = req.body;

    if (!role) {
      return sendError(res, 400, "Missing field: role");
    }

    const sessionId = generateSessionId();

    const session = {
      sessionId,
      role,
      merchantId: merchantId || null,
      createdAt: Date.now()
    };

    sessions.set(sessionId, session);

    console.log("[SESSION] Created:", sessionId);

    return sendSuccess(res, 201, "Session created", session);
  } catch (err) {
    console.error("[SESSION] Create error:", err);
    next(err);
  }
}

// GET SESSION
export function getSession(req, res, next) {
  try {
    const { sessionId } = req.params;

    console.log("[SESSION] Fetch request:", sessionId);

    const session = sessions.get(sessionId);

    if (!session) {
      return sendError(res, 404, "Session not found");
    }

    return sendSuccess(res, 200, "Session retrieved", session);
  } catch (err) {
    console.error("[SESSION] Fetch error:", err);
    next(err);
  }
}

