const Service = require('./base')

class UsersService extends Service {
  constructor() {
    super('User', ['id', 'username', 'email', 'password'])
  }
}

const usersService = new UsersService()

module.exports = usersService
