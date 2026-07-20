export function errorMiddleware(err, req, res, next) {
  console.error("[HoloTap API Error]", err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}
