const bcrypt = require('bcrypt')

const { usersService, restaurantsService } = require('../services')

const { returnPage, redirection } = require('../utils')

class UsersController {
  // 註冊
  async register(req, res, next) {
    try {
      // 導向頁面
      const path = redirection(req.headers.referer)
      // 宣告表單資料
      const { username, email, password, rePassword } = req.body
      // 檢查資料是否缺少
      const exist = await usersService.checkExist({ username })
      if (exist > 0) {
        req.flash('error', '已註冊')
        return res.redirect(path)
      }
      if (!username || !email || !password || !rePassword) {
        req.flash('error', '缺少必填資料')
        return res.redirect(path)
      }
      if (password !== rePassword) {
        req.flash('error', '密碼與確認密碼不相符')
        return res.redirect(path)
      }
      if (username === password) {
        req.flash('error', '帳號不可與密碼相同')
        return res.redirect(path)
      }
      // 密碼加密
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      // 根據表單資料新增餐廳
      await usersService.create({ username, email, password: hashedPassword })
      // 成功訊息
      req.flash('success', '註冊成功')
      // 註冊完開啟登入彈跳窗
      req.session.login = true
      // 發送回應
      // console.log('\n', 'after register', '\n')
      res.redirect(path)
    } catch (error) {
      // 訊息處理中間件
      error.errorMessage = '註冊失敗'
      // 錯誤處理中間件
      next(error)
    }
  }

  // 渲染會員頁面
  async renderProfile(req, res, next) {
    try {
      // 用戶ID
      const userId = req.user.id
      // 取得用戶資訊
      const user = await usersService.getById(userId)
      // 檢查用戶是否存在
      if (!user) {
        req.flash('error', '查無用戶')
        return res.redirect('/restaurants')
      }
      // 取得餐廳資訊(有可能會沒有)
      const restaurants = await restaurantsService.getAll({ userId })
      // 廳數索引
      req.session.index = restaurants.map((restauants) => restauants.id)
      // 發送回應
      res.render('profile', { user, restaurants })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 渲染新增頁面
  renderCreatePage(req, res, next) {
    try {
      // 返回頁面
      const back = returnPage(req.headers.referer)
      // 發送回應
      res.render('create', { back })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 渲染編輯頁面(含取得單間餐廳資訊)
  async renderEditPage(req, res, next) {
    try {
      // 返回頁面
      const back = returnPage(req.headers.referer)
      // 取得餐廳ID
      const id = req.params.id
      // 取得單間餐廳
      const restaurant = await restaurantsService.getById(id)
      // 發送回應
      res.render('edit', { restaurant, back })
    } catch (error) {
      // 錯誤處理中間件
      next(error)
    }
  }
  // 取得用戶單間餐廳資訊
  async renderUserRestaurant(req, res, next) {
    try {
      // 返回頁面
      let back = returnPage(req.headers.referer)
      if (/^\/users\/restaurant\/\d+$/.test(back)) back = '/users/profile'
      // 渲染編輯按鈕
      const editBtns = true
      // 用戶ID
      const userId = req.user.id
      // 取得餐廳UD
      const id = req.params.id
      // 取得單間餐廳
      const restaurant = await restaurantsService.getById(id)
      // 當前全部餐廳索引
      const index = req.session.index
      const previous = restaurantsService.getIdbyIndex(id, index, 'previous')
      const next = restaurantsService.getIdbyIndex(id, index, 'next')
      // 檢查餐廳是否存在
      if (!restaurant) {
        req.flash('error', '查無餐廳')
        return res.redirect('/restaurants')
      }
      if (restaurant.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }
      // 發送回應
      res.render('detail', { restaurant, editBtns, back, previous, next })
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
      // 用戶ID
      const userId = req.user.id
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
        description,
        userId
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
      // 取得餐廳ID
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
      res.redirect(`/users/restaurant/${id}`)
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
      // 取得餐廳ID
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
}

module.exports = new UsersController()
