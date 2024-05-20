const { Router } = require('express')
const router = Router()
const { restaurantsController } = require('../controllers')
router.get('/', restaurantsController.getAllRestaurants)
router.get('/create', restaurantsController.renderCreatePage)
router.post('/create', restaurantsController.createRestaurant)
router.get('/:id', restaurantsController.getRestaurant)
module.exports = router
