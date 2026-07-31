export function validate(requiredFields) {
  return (req, res, next) => {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        console.warn(`[VALIDATION] Missing field: ${field}`);
        return res.status(400).json({
          success: false,
          message: `Missing field: ${field}`
        });
      }
    }
    console.log("[VALIDATION] OK:", requiredFields);
    next();
  };
}
