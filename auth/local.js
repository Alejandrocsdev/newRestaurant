const bcrypt = require('bcrypt')

const { Strategy } = require('passport-local')
const { usersService } = require('../services')

const customFields = { usernameField: 'email', passwordField: 'password' }

const verifyCallback = async (email, password, done) => {
  try {
    const user = await usersService.getByData({ email })
    if (!user) return done(null, false, { message: '信箱錯誤' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return done(null, false, { message: '密碼錯誤' })
    done(null, user)
  } catch (error) {
    done(error, null)
  }
}

const localStrategy = new Strategy(customFields, verifyCallback)

module.exports = localStrategy
