const { restaurantsService } = require('../services')

class RestaurantsController {
  // 取得全部餐廳資訊
  async getAllRestaurants(req, res, next) {
    try {
      // 登入狀態
      const isLoggedIn = false
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
        isLoggedIn
        // createBtn
      })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 取得單間餐廳資訊
  async getRestaurant(req, res, next) {
    try {
      // 登入狀態
      const isLoggedIn = false
      // 渲染編輯按鈕
      const editBtns = true
      // 取得參數id
      const id = req.params.id
      // 取得單間餐廳
      const restaurant = await restaurantsService.getById(id)
      // 檢查餐廳是否存在
      if (!restaurant) {
        res.status(404).send('查無此餐廳')
        return
      }
      // 發送回應
      res.render('detail', { restaurant, editBtns, isLoggedIn })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 新增餐廳
  async createRestaurant(req, res, next) {
    try {
      // 宣告表單資料
      const { name, name_en, category, image, location, phone, google_map, rating, description } =
        req.body
      // 根據表單資料新增餐廳
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
      // 成功訊息
      req.flash('success', '新增成功')
      // 發送回應
      res.redirect('/restaurants')
    } catch (error) {
      // 訊息處理中間件
      error.errorMessage = '新增失敗'
      // 錯誤處理中間件
      next(error)
    }
  }
  // 更新餐廳
  async updateRestaurant(req, res, next) {
    try {
      // 宣告表單資料
      const { name, name_en, category, image, location, phone, google_map, rating, description } =
        req.body
      // 取得參數id
      const id = req.params.id
      // 根據表單資料更新餐廳
      await restaurantsService.update(
        {
          name,
          name_en,
          category,
          image,
          location,
          phone,
          google_map,
          rating,
          description
        },
        id
      )
      // 成功訊息
      req.flash('success', '更新成功')
      // 發送回應
      res.redirect('/restaurants')
    } catch (error) {
      // 訊息處理中間件
      error.errorMessage = '更新失敗'
      // 錯誤處理中間件
      next(error)
    }
  }
  // 刪除餐廳
  async deleteRestaurant(req, res, next) {
    try {
      // 取得參數id
      const id = req.params.id
      // 刪除餐廳
      await restaurantsService.delete(id)
      // 成功訊息
      req.flash('success', '刪除成功')
      // 發送回應
      res.redirect('/restaurants')
    } catch (error) {
      // 訊息處理中間件
      error.errorMessage = '刪除失敗'
      // 錯誤處理中間件
      next(error)
    }
  }
  // 渲染新增頁面
  renderCreatePage(req, res) {
    try {
      // 登入狀態
      const isLoggedIn = false
      // 發送回應
      res.render('create', { isLoggedIn })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 渲染編輯頁面(含取得單間餐廳資訊)
  async renderEditPage(req, res, next) {
    try {
      // 登入狀態
      const isLoggedIn = false
      // 取得參數id
      const id = req.params.id
      // 取得單間餐廳
      const restaurant = await restaurantsService.getById(id)
      // 發送回應
      res.render('edit', { restaurant, isLoggedIn })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
}

const restaurantsController = new RestaurantsController()

module.exports = restaurantsController
