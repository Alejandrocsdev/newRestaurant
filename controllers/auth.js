const { authService } = require('../services')

class AuthController {
  login(req, res, next) {
    const { path } = req.body
    authService.authenticate(path)(req, res, next)
  }

  logout(req, res, next) {
    req.logout((error) => {
      if (error) return next(error)
      res.redirect('/restaurants')
    })
  }
}

module.exports = new AuthController()
