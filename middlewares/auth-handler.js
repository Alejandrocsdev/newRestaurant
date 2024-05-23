const { redirection, nonProtectedPath } = require('../utils')

function authHandler(req, res, next) {
  if(nonProtectedPath(req)) return next()
  if (req.isAuthenticated()) return next()
  const path = redirection(req.headers.referer)
  res.redirect(path)
}

module.exports = authHandler
