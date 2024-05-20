const { restaurantsService } = require('../services')

const restaurants = require('../public/jsons/restaurants.json')

class RestaurantsController {
  async getAllRestaurants(req, res) {
    try {
      const keyword = req.query.search?.trim()
      const restaurants = await restaurantsService.getAll()
      const matched = await restaurantsService.getMatched(restaurants, keyword)
      res.render('home', { restaurants: matched, keyword })
    } catch (err) {
      console.error('Error:', err)
      res.status(500).send('Internal Server Error')
    }
  }

  async getRestaurant(req, res) {
    try {
      const id = req.params.id
      const restaurant = await restaurantsService.getById(id)
      if (!restaurant) {
        res.status(404).send('Restaurant not found')
        return
      }
      res.render('restaurant', { restaurant })
    } catch (err) {
      console.error('Error:', err)
      res.status(500).send('Internal Server Error')
    }
  }
}

const restaurantsController = new RestaurantsController()

module.exports = restaurantsController
