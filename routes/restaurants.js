const { Router } = require('express')
const router = Router()
const { restaurantsController } = require('../controllers')
router.get('/', restaurantsController.getAll)
router.get('/:id', (req, res) => {
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})
module.exports = router
