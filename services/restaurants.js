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

  // getPaginator(page, totalPages, showPages) {
  //   const paginator = []
  //   const startPage = Math.max(1, Math.min(page - Math.floor(showPages / 2), totalPages - showPages + 1))

  //   for (let i = startPage; i < startPage + showPages && i <= totalPages; i++) {
  //     paginator.push({ page: i })
  //   }

  //   return paginator
  // }
}

const restaurantsService = new RestaurantsService()

module.exports = restaurantsService
