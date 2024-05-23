const { Router } = require('express')
const router = Router()

const { usersController } = require('../controllers')

router.post('/register', usersController.register)

module.exports = router
