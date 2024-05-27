const bcrypt = require('bcrypt')

const { Strategy } = require('passport-local')
const { usersService } = require('../services')

const customFields = { usernameField: 'username', passwordField: 'password' }

const verifyCallback = async (username, password, done) => {
  try {
    const user = await usersService.getByData({ username })
    if (!user) return done(null, false, { message: '帳號錯誤' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return done(null, false, { message: '密碼錯誤' })
    done(null, user)
  } catch (error) {
    done(error, null)
  }
}

const localStrategy = new Strategy(customFields, verifyCallback)

module.exports = localStrategy
