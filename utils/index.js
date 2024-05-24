// Handlebars Helpers
const helpers = {
  // 分頁按鈕關閉樣式
  inactive: (page, value) => (page === value ? 'inactive' : ''),
  // 分頁按鈕點擊樣式
  clicked: (page, value) => (page === value ? 'clicked' : ''),
  // 接受兩個值
  and: (a, b) => a && b
}

function redirection(referer) {
  const url = new URL(referer)
  const refererPath = url.pathname
  if (/^\/restaurants\/\d+$/.test(refererPath)) return refererPath
  else return '/restaurants'
}

function nonProtectedRoute(req) {
  const method = req.method
  const path = req.originalUrl
  const { page, search } = req.query

  if (method === 'GET' && path === '/restaurants') return true
  if (method === 'GET' && path.startsWith('/restaurants') && (page || search)) return true
  if (method === 'GET' && /^\/restaurants\/\d+$/.test(path)) return true
  
  return false
}

module.exports = { helpers, redirection, nonProtectedRoute }
