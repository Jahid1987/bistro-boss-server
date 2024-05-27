function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    if (req.user && req.user.role) {
      if (allowedRoles.includes(req.user.role)) {
        return next();
      } else {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized: No role information" });
    }
  };
}

module.exports = roleMiddleware;
