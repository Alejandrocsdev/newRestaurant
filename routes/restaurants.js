const { Router } = require('express')
const router = Router()

const { restaurantsController } = require('../controllers')

// 無須登入: 餐廳資訊
router.get('/', restaurantsController.getAllRestaurants)
router.get('/:id', restaurantsController.getRestaurant)

module.exports = router
