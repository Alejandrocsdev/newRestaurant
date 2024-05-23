const { Strategy } = require('passport-local')
const { usersService } = require('../services')

const customFields = {
  usernameField: 'username',
  passwordField: 'password'
}

const verifyCallback = async (username, password, done) => {
  console.log('Verify Callback')
  console.log('username: ', username)
  console.log('password: ', password)
  try {
    const user = await usersService.getByData({ username })
    console.log('user: ', user)
    if (!user) throw new Error('帳號錯誤')
    if (user.password !== password) throw new Error('密碼錯誤')
    done(null, user)
  } catch (error) {
    done(error, null)
  }
}

const serializeHandler = (user, done) => {
  console.log('Serialize Handler')
  console.log('user: ', user)
  done(null, user.id)
}

const deserializeHandler = async (id, done) => {
  console.log('Deserialize Handler')
  console.log('id: ', id)
  try {
    const user = await usersService.getById(id)
    console.log('user: ', user)
    if (!user) throw new Error('帳號尚未登入')
    done(null, user)
  } catch (error) {
    done(error, null)
  }
}

const strategy = new Strategy(customFields, verifyCallback)

function auth(passport) {
  passport.use(strategy)
  passport.serializeUser(serializeHandler)
  passport.deserializeUser(deserializeHandler)
}

module.exports = auth
