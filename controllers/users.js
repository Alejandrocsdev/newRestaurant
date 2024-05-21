const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { usersService } = require('../services')

class UsersController {
  register(req, res, next) {
    res.send('register')
  }

  login(req, res, next) {
    usersService.usePassport()
    usersService.authenticate()(req, res, next)
  }
}

const usersController = new UsersController()

module.exports = usersController
