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

function redirection(referer) {
  const url = new URL(referer)
  const refererPath = url.pathname
  if (/^\/restaurants\/\d+$/.test(refererPath)) return refererPath
  else return '/restaurants'
}

function nonProtectedPath(req) {
  const method = req.method
  const path = req.originalUrl
  const { page, search } = req.query

  if (method === 'GET' && path === '/restaurants') return true
  if (method === 'GET' && path.startsWith('/restaurants') && (page || search)) return true
  if (method === 'GET' && /^\/restaurants\/\d+$/.test(path)) return true
  
  return false
}

module.exports = { helpers, redirection, nonProtectedPath }
