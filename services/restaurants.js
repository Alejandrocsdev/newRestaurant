const Service = require('./base')

class RestaurantsService extends Service {
  constructor() {
    super('Restaurant', [
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
    ])
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
