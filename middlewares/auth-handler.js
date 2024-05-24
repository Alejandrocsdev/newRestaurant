const { redirection, nonProtectedRoute } = require('../utils')

function authHandler(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated()
  if(nonProtectedRoute(req)) return next()
  if (req.isAuthenticated()) return next()
  req.flash('error', '尚未登入')
  const path = redirection(req.headers.referer)
  res.redirect(path)
}

module.exports = authHandler
