const { usersService } = require('../services')

class UsersController {
  register(req, res, next) {
    const { username, email, password, path } = req.body
    res.send('register')
  }

  login(req, res, next) {
    const { username, password, path } = req.body
    res.send('login')
  }
}

const usersController = new UsersController()

module.exports = usersController
