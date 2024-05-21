// API
const BASE_URL = window.location.origin
// 分頁容器
const paginator = document.querySelector('.paginator')
// 新增頁面
const createBtns = document.querySelector('.create-btn')
const createInput = document.querySelectorAll('.create-input')
// 編輯頁面
const editBtns = document.querySelector('.edit-btn')
const editInput = document.querySelectorAll('.edit-input')
// 初始內容記錄
const reset = {}

;(function init() {
  // 監聽器: 新增頁面按鈕
  if (createBtns) {
    createBtns.addEventListener('click', onCreatePage)
  }
  // 監聽器: 編輯頁面按鈕
  if (editBtns) {
    value('original')
    editBtns.addEventListener('click', onEditPage)
  }
})()

function onCreatePage(event) {
  const target = event.target
  if (target.classList.contains('return-btn')) {
    event.preventDefault()
    window.location.href = `${BASE_URL}/restaurants`
  } else if (target.classList.contains('reset-btn')) {
    event.preventDefault()
    createInput.forEach((element) => (element.value = ''))
  }
}

function onEditPage(event) {
  const target = event.target
  if (target.classList.contains('return-btn')) {
    event.preventDefault()
    const pathname = window.location.pathname
    const newPath = pathname.replace('/edit', '')
    window.location.href = `${BASE_URL}${newPath}`
  } else if (target.classList.contains('reset-btn')) {
    event.preventDefault()
    value('current')
  }
}

function value(type) {
  editInput.forEach((element) => {
    const key = element.getAttribute('name')
    if (type === 'original') {
      reset[key] = element.value
    } else if (type === 'current') {
      element.value = reset[key]
    }
  })
}
