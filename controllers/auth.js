const { authService } = require('../services')

const { redirection } = require('../utils')

class AuthController {
  login(req, res, next) {
    const path = redirection(req.headers.referer)
    authService.authenticate(path)(req, res, next)
  }

  logout(req, res, next) {
    const path = redirection(req.headers.referer)

    req.logout((error) => {
      if (error) return next(error)
      res.redirect(path)
    })
  }
}

module.exports = new AuthController()
