const { Router } = require('express')
const router = Router()

const { usersController } = require('../controllers')

// 必須登入: 餐廳資訊
router.get('/restaurant/create', usersController.renderCreatePage)
router.post('/restaurant/create', usersController.createRestaurant)
router.get('/restaurant/:id/edit', usersController.renderEditPage)
router.get('/restaurant/:id', usersController.renderUserRestaurant)
router.put('/restaurant/:id', usersController.updateRestaurant)
router.delete('/restaurant/:id', usersController.deleteRestaurant)
// 用戶資訊
router.get('/profile', usersController.renderProfile)
router.post('/register', usersController.register)

module.exports = router
