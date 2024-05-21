// Handlebars Helpers
const helpers = {
  // 分頁按鈕關閉樣式
  inactive: (page, value) => (page === value ? 'inactive' : ''),
  // 分頁按鈕點擊樣式
  clicked: (page, value) => (page === value ? 'clicked' : ''),
  // 登入樣式
  loggedIn: (isLoggedIn) => (isLoggedIn ? '' : 'hide'),
  // 登出樣式
  loggedOut: (isLoggedIn) => (isLoggedIn ? 'hide' : '')
}

module.exports = helpers
