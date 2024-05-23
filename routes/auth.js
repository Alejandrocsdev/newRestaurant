const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router
