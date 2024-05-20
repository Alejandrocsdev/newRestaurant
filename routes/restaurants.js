const { Router } = require('express')
const router = Router()
const { restaurantsController } = require('../controllers')
router.get('/', (req, res) => {
  res.send('listing restaurants')
})
router.get('/:id', (req, res) => {
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})
module.exports = router
