const { restaurantsService } = require('../services')

const restaurants = require('../public/jsons/restaurants.json')

class RestaurantsController {
  async getAll(req, res) {
    try {
      const keyword = req.query.search?.trim()
      const matched = keyword
        ? restaurants.filter((restaurant) =>
            Object.values(restaurant).some((property) => {
              if (typeof property === 'string') {
                return property.toLowerCase().includes(keyword.toLowerCase())
              }
            })
          )
        : restaurants
      res.render('home', { restaurants: matched, keyword })
    } catch (err) {
      console.error('Error:', err)
      res.status(500).send('Internal Server Error')
    }
  }
}

const restaurantsController = new RestaurantsController()

module.exports = restaurantsController
