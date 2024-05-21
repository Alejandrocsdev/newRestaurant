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
    this.restaurants = []
    this.load()
  }

  async load() {
    this.restaurants = await this.getAll()
  }

  getMatched(keyword) {
    return this.restaurants.filter((restaurant) =>
      Object.values(restaurant).some((property) => {
        if (typeof property === 'string') {
          return property.toLowerCase().includes(keyword.toLowerCase())
        }
      })
    )
  }

  getPaginator(page, totalPages, showPages) {
    let paginator = []
    for (
      // 分頁起始值
      let i = page <= totalPages - (showPages - 1) ? page : totalPages - (showPages - 1);
      // 分頁顯示數
      totalPages >= showPages ? i < page + showPages && i <= totalPages : i <= totalPages;
      // 分頁間距
      i++
    ) {
      if (i > 0) {
        paginator.push(i)
      }
    }
    return paginator
  }
}

const restaurantsService = new RestaurantsService()

module.exports = restaurantsService
