const { usersService } = require('../services')

class UsersController {
  register(req, res, next) {
    res.send('register')
  }
}

module.exports = new UsersController()
