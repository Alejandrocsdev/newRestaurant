const { restaurantsService } = require('../services')

const restaurants = require('../public/jsons/restaurants.json')

class RestaurantsController {
  async getAllRestaurants(req, res) {
    try {
      const keyword = req.query.search?.trim()
      const create = true
      const restaurants = await restaurantsService.getAll()
      const matched = await restaurantsService.getMatched(restaurants, keyword)
      res.render('home', { restaurants: matched, keyword, create })
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

  async createRestaurant(req, res) {
    try {
      const { name, name_en, category, image, location, phone, google_map, rating, description } =
        req.body
        console.log(name, name_en, category)
      await restaurantsService.create({
        name,
        name_en,
        category,
        image,
        location,
        phone,
        google_map,
        rating,
        description
      })
      res.redirect('/restaurants')
    } catch (err) {
      console.error('Error:', err)
      res.status(500).send('Internal Server Error')
    }
  }

  renderCreatePage(req, res) {
    try {
      res.render('create')
    } catch (err) {
      console.error('Error:', err)
      res.status(500).send('Internal Server Error')
    }
  }
}

const restaurantsController = new RestaurantsController()

module.exports = restaurantsController
