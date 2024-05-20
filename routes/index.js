const { Router } = require('express')
const restaurantsRouter = require('./restaurants')
const router = Router()
router.use('/restaurants', restaurantsRouter)
module.exports = router