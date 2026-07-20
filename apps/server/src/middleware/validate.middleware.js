export function validate(requiredFields) {
  return (req, res, next) => {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing field: ${field}`
        });
      }
    }
    next();
  };
}
