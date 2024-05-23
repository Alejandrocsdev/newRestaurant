function authHandler(req, res, next) {
  const method = req.method
  const path = req.originalUrl

  if (method === 'GET' && path === '/restaurants') return next()
  if (method === 'GET' && /^\/restaurants\/\d+$/.test(path)) return next()

  if (req.isAuthenticated()) return next()

  res.redirect('/restaurants')
}

module.exports = authHandler
