const { restaurantsService } = require('../services')

const { returnPage } = require('../utils')

class RestaurantsController {
  // 取得全部餐廳資訊
  async getAllRestaurants(req, res, next) {
    try {
      // 開啟登入彈跳窗
      const login = req.session.login || false
      if (login) req.session.login = false
      // 搜尋關鍵字
      const keyword = req.query.search || ''
      // 當前頁數
      const page = Number(req.query.page) || 1
      // 顯示餐廳數
      const limit = 3
      // 省略筆數
      const offset = (page - 1) * limit
      // 取得資料資訊
      const data = await restaurantsService.getAndCountAll(offset, limit)
      // 全部餐廳資訊(含搜尋結果)
      const restaurants = keyword ? restaurantsService.getMatched(keyword) : data.rows
      // 總餐廳數
      const totalDatas = keyword ? restaurants.length : data.count
      // 廳數索引
      req.session.index = keyword
        ? restaurants.map((restauants) => restauants.id)
        : await restaurantsService.getAllIds()
      // 全部頁數
      const totalPages = Math.ceil(totalDatas / limit)
      // 最大顯示頁數
      const showPages = 3
      // 分頁資訊
      const paginator = restaurantsService.getPaginator(page, totalPages, showPages)
      // 發送回應
      res.render('home', {
        restaurants: keyword ? restaurants.slice((page - 1) * limit, page * limit) : restaurants,
        first: 1,
        prev: page > 1 ? page - 1 : page,
        next: page < totalPages ? page + 1 : page,
        last: totalPages,
        paginator,
        page,
        keyword,
        login
      })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 取得單間餐廳資訊
  async getRestaurant(req, res, next) {
    try {
      // 開啟登入彈跳窗
      const login = req.session.login || false
      if (login) req.session.login = false
      
      // 返回頁面
      let back = returnPage(req.headers.referer)
      if (/^\/restaurants\/\d+$/.test(back)) back = '/restaurants'
      // 取得參數id
      const id = req.params.id
      // 取得單間餐廳
      const restaurant = await restaurantsService.getById(id)
      // 當前全部餐廳索引
      const index = req.session.index
      const previous = restaurantsService.getIdbyIndex(id, index, 'previous')
      const next = restaurantsService.getIdbyIndex(id, index, 'next')
      // 檢查餐廳是否存在
      if (!restaurant) {
        req.flash('error', '查無此餐廳}')
        return res.redirect('back')
      }
      // 發送回應
      res.render('detail', { restaurant, back, previous, next, login })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
}

module.exports = new RestaurantsController()
