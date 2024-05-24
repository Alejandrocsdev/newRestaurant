// 分頁容器
const paginator = document.querySelector('.paginator')
// 登入/註冊 彈跳窗
const sign = document.querySelector('.sign')
const modalClose = document.querySelector('.modal-close')
const modalBg = document.querySelector('.modal-bg')
const modal = document.querySelector('.modal')
// 新增頁面
const createPageBtns = document.querySelector('.create-page-btns')
const createInput = document.querySelectorAll('.create-input')
// 編輯頁面
const editPageBtns = document.querySelector('.edit-page-btns')
const editInput = document.querySelectorAll('.edit-input')
// API
const BASE_URL = window.location.origin
// 初始內容記錄
const reset = {}

;(function init() {
  // 監聽器: 新增頁面按鈕
  if (createPageBtns) {
    createPageBtns.addEventListener('click', onCreatePage)
    customInputMessage(createInput)
  }
  // 監聽器: 編輯頁面按鈕
  if (editPageBtns) {
    value('original')
    editPageBtns.addEventListener('click', onEditPage)
    customInputMessage(editInput)
  }
  // 監聽器: 登入/註冊 彈跳窗 開
  if (sign) {
    sign.addEventListener('click', onOpenModal)
  }
})()

// 監聽器函式: 新增頁面按鈕
function onCreatePage(event) {
  const target = event.target
  if (target.classList.contains('reset-btn')) {
    event.preventDefault()
    createInput.forEach((element) => (element.value = ''))
  }
}

// 監聽器函式: 編輯頁面按鈕
function onEditPage(event) {
  const target = event.target
  if (target.classList.contains('reset-btn')) {
    event.preventDefault()
    value('current')
  }
}

// 監聽器函式: 登入/註冊 彈跳窗 開
function onOpenModal(event) {
  const target = event.target
  if (target.classList.contains('sign-in')) {
    modal.innerHTML = createModal('登入')
    modalBg.classList.remove('hide')
  } else if (target.classList.contains('sign-up')) {
    modal.innerHTML = createModal('註冊')
    modalBg.classList.remove('hide')
  }
  // 監聽器: 登入/註冊 彈跳窗 關
  const modalClose = document.querySelector('.modal-close')
  modalClose.addEventListener('click', () => modalBg.classList.add('hide'))
}

// 自定欄位警示訊息
function customInputMessage(page) {
  page.forEach((input) => {
    input.setAttribute('oninvalid', "setCustomValidity('請填寫此欄位')")
    input.setAttribute('oninput', "setCustomValidity('')")
  })
}

// 儲存初始input值
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

// 新增: 彈跳窗HTML字串
function createModal(name) {
  const path = name === '註冊' ? 'register' : 'login'
  return `<form class="modal-form" action="/auth/${path}" method="POST">
    <button class="modal-close" type="button">X</button>
    <h1 class="modal-name">${name}</h1>
    ${createLabeledInput('username', '帳號')}
    ${name === '註冊' ? createLabeledInput('email', '信箱') : ''}
    ${createLabeledInput('password', '密碼', 'password')}
    ${name === '註冊' ? createLabeledInput('re-password', '確認密碼', 'password') : ''}
    <button class="modal-submit" type="submit">提交</button>
  </form>`
}

// 新增: 彈跳窗共用input欄位HTML字串
function createLabeledInput(id, text, type = 'text') {
  return `<div>
  <label for="${id}">${text}</label>
  <span>:</span>
  <input id="${id}" name="${id}" type="${type}">
</div>`
}
