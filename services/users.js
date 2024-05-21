const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Service = require('./base')

class UsersService extends Service {
  constructor() {
    super('User', ['id', 'username', 'email', 'password'])
  }

  usePassport() {
    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          const user = await usersService.getByData({ username })
          if (!user || user.password !== password) {
            return done(null, false, { type: 'error', message: '帳號或密碼錯誤' })
          }
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      })
    )

    passport.serializeUser((user, done) => {
      const { id, username, email } = user
      return done(null, { id, username, email })
    })

    // passport.deserializeUser(async (user, done) => {
    //   try {
    //     const foundUser = await usersService.getById(user.id)
    //     done(null, foundUser)
    //   } catch (err) {
    //     done(err)
    //   }
    // })
  }
  authenticate() {
    return passport.authenticate('local', {
      successRedirect: '/restaurants',
      failureRedirect: '/restaurants',
      failureFlash: true
    })
  }
}

const usersService = new UsersService()

module.exports = usersService
