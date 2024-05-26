const { usersService } = require('../services')

const { redirection } = require('../utils')

class AuthController {
  // 登入
  login(req, res, next) {
    // 導向頁面
    const path = redirection(req.headers.referer)

    return (error, user, info) => {
      if (error) return next(error)
      req.login(user, (error) => {
        if (error) {
          error.errorMessage = `登入失敗: ${info.message}`
          return next(error)
        }
        req.flash('success', '登入成功')
        res.redirect(path)
      })
    }
  }

  // 登出
  logout(req, res, next) {
    // 導向頁面
    const path = redirection(req.headers.referer)

    req.logout((error) => {
      if (error) {
        error.errorMessage = '登出失敗'
        return next(error)
      }
      req.flash('success', '登出成功')
      res.redirect(path)
    })
  }

}

module.exports = new AuthController()
