const { Router } = require('express')
const router = Router()

const { authHandler } = require('../middlewares')

const authRouter = require('./auth')
const usersRouter = require('./users')
const restaurantsRouter = require('./restaurants')

router.use('/auth', authRouter)
router.use('/users', authHandler, usersRouter)
router.use('/restaurants',authHandler, restaurantsRouter)

module.exports = router
