const Service = require('./base')

class UsersService extends Service {
  constructor() {
    super('User', ['id', 'name', 'email', 'password'])
  }
}

module.exports = new UsersService()
