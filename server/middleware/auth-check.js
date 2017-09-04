function authCheckMiddleware() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      next({
        status: 401,
        message: "Error: User not logged in."
      })
    }
  }
}

module.exports = authCheckMiddleware
