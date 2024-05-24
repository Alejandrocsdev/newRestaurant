const passport = require('passport')

const { Router } = require('express')
const router = Router()

const { authController } = require('../controllers')

router.post('/login', (req, res, next) => {
  // 取代預設錯誤訊息: Missing credentials
  const options = { badRequestMessage: '缺少帳號或密碼' }
  // 身分驗證自定義回傳函式
  const callback = authController.login(req, res, next)
  // 身分驗證
  passport.authenticate('local', options, callback)(req, res, next)
})

// router.post('/login', passport.authenticate('local', options))

router.post('/logout', authController.logout)

module.exports = router
