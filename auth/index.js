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

const serializeHandler = (user, done) => done(null, user.id)

const deserializeHandler = async (id, done) => {
  const user = await usersService.getById(id)
  done(null, user)
}

const strategy = new Strategy(customFields, verifyCallback)

function auth(passport) {
  passport.use(strategy)
  passport.serializeUser(serializeHandler)
  passport.deserializeUser(deserializeHandler)
}

module.exports = auth
