const { Router } = require('express')
const usersRouter = require('./users')
const restaurantsRouter = require('./restaurants')
const router = Router()
router.use('/users', usersRouter)
router.use('/restaurants', restaurantsRouter)
module.exports = router
