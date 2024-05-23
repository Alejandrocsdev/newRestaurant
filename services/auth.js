const passport = require('passport')

class AuthService {
  authenticate(path) {
    return passport.authenticate('local', {
      successRedirect: path,
      failureRedirect: path,
      failureFlash: true
    })
  }
}

module.exports = new AuthService()
