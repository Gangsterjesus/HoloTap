export function requireSession(req, res, next) {
  const sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    return res.status(401).json({
      success: false,
      message: "Missing session"
    });
  }

  next();
}
