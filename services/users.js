const Service = require('./base')

class UsersService extends Service {
  constructor() {
    super('User', ['id', 'username', 'email', 'password'])
  }
}

module.exports = new UsersService()
