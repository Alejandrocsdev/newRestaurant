const db = require('../models')
const Restaurant = db.Restaurant
const attributes = [
  'id',
  'name',
  'name_en',
  'category',
  'image',
  'location',
  'phone',
  'google_map',
  'rating',
  'description'
]

class RestaurantsService {
  getAll() {
    return Restaurant.findAll({ attributes, raw: true })
  }

  getById(id) {
    return Restaurant.findByPk(id, { attributes, raw: true })
  }

  getMatched(restaurants, keyword) {
    return keyword
      ? restaurants.filter((restaurant) =>
          Object.values(restaurant).some((property) => {
            if (typeof property === 'string') {
              return property.toLowerCase().includes(keyword.toLowerCase())
            }
          })
        )
      : restaurants
  }
}

const restaurantsService = new RestaurantsService()

module.exports = restaurantsService
