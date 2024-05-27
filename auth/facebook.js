const bcrypt = require('bcrypt')

const { Strategy } = require('passport-facebook')
const { usersService } = require('../services')

const config = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['email', 'displayName'],
  state: true
}

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value
    const name = profile.displayName
    let user = await usersService.getByData({ email })
    if (user) return done(null, user)
    const randomPwd = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(randomPwd, 10)
    user = await usersService.create({ name, email, password: hashedPassword })
    done(null, user)
  } catch (error) {
    done(error, null)
  }
}

const facebookStrategy = new Strategy(config, verifyCallback)

module.exports = facebookStrategy
