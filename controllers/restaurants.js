const { restaurantsService } = require('../services')

class RestaurantsController {
  // 取得全部餐廳資訊
  async getAllRestaurants(req, res, next) {
    try {
      // 搜尋關鍵字
      const keyword = req.query.search?.trim()
      // 渲染新增按鈕
      const create = true
      // 取得全部餐廳
      const restaurants = await restaurantsService.getAll()
      // 取得搜尋吻合餐廳
      const matched = await restaurantsService.getMatched(restaurants, keyword)
      // 發送回應
      res.render('home', { restaurants: matched, keyword, create })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 取得單間餐廳資訊
  async getRestaurant(req, res, next) {
    try {
      // 渲染編輯及刪除按鈕
      const editDelete = true
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
      res.render('restaurant', { restaurant, editDelete })
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
      // 發送回應
      res.render('create')
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 渲染編輯頁面(含取得單間餐廳資訊)
  async renderEditPage(req, res, next) {
    try {
      // 取得參數id
      const id = req.params.id
      // 取得單間餐廳
      const restaurant = await restaurantsService.getById(id)
      // 發送回應
      res.render('edit', { restaurant })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
}

const restaurantsController = new RestaurantsController()

module.exports = restaurantsController
