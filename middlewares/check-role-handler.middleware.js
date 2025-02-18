const requiredRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        'Insufficient privileges. Kindly conact the system administrator!'
      );
    }
    next();
  };
};

module.exports = requiredRole;
