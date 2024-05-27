const localStrategy = require('./local')
const facebookStrategy = require('./facebook')

const { usersService } = require('../services')

const serializeHandler = (user, done) => done(null, user.id)

const deserializeHandler = async (id, done) => {
  const user = await usersService.getById(id)
  done(null, user)
}

function auth(passport) {
  passport.use(localStrategy)
  passport.use(facebookStrategy)
  passport.serializeUser(serializeHandler)
  passport.deserializeUser(deserializeHandler)
}

module.exports = auth
