const { Router } = require('express')
const router = Router()

const { restaurantsController } = require('../controllers')

router.get('/', restaurantsController.getAllRestaurants)
router.get('/create', restaurantsController.renderCreatePage)
router.get('/:id/edit', restaurantsController.renderEditPage)
router.get('/:id', restaurantsController.getRestaurant)
router.post('/create', restaurantsController.createRestaurant)
router.put('/:id', restaurantsController.updateRestaurant)
router.delete('/:id', restaurantsController.deleteRestaurant)

module.exports = router
