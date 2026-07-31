export function requireSession(req, res, next) {
  const sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    console.warn("[SESSION] Missing x-session-id");
    return res.status(401).json({
      success: false,
      message: "Missing session"
    });
  }

  console.log("[SESSION] OK:", sessionId);
  req.sessionId = sessionId;
  next();
}
