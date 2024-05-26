// Handlebars Helpers
const helpers = {
  // 分頁按鈕關閉樣式
  inactive: (page, value) => (page === value ? 'inactive' : ''),
  // 分頁按鈕點擊樣式
  clicked: (page, value) => (page === value ? 'clicked' : ''),
  // 接受兩個值
  and: (a, b) => a && b,
  // 餐廳頁面(會員)路徑
  users: (editBtns) => (editBtns ? '/users/restaurant/' : '/restaurants/'),
  // 登入彈跳窗(背景)
  loginModal: (login) => login ? 'loginModal' : 'hide'
}
// NOTE: 
// createButton: function (text, url) {
//   return new Handlebars.SafeString(`<a href="${url}" class="btn">${text}</a>`);
// }

function redirection(referer) {
  const url = new URL(referer)
  const refererPath = url.pathname
  if (/^\/restaurants\/\d+$/.test(refererPath)) return refererPath
  else return '/restaurants'
}

function returnPage(referer) {
  const url = new URL(referer)
  const pathname = url.pathname
  const search = url.search
  const returnPath = `${pathname}${search}`
  return returnPath
}

function nonProtectedRoute(req) {
  const method = req.method
  const path = req.originalUrl
  const { page, search } = req.query

  if (method === 'GET' && path === '/restaurants') return true
  if (method === 'GET' && path.startsWith('/restaurants') && (page || search)) return true
  if (method === 'GET' && /^\/restaurants\/\d+$/.test(path)) return true
  if (method === 'POST' && path === '/users/register') return true

  return false
}

module.exports = { helpers, redirection, returnPage, nonProtectedRoute }
