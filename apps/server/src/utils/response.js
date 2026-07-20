export function sendSuccess(res, status, message, data = null) {
  return res.status(status).json({ success: true, message, data });
}

export function sendError(res, status, message) {
  return res.status(status).json({ success: false, message });
}
