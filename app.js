const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const router = require('./routes')
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(
  session({
    secret: 'ThisIsSecret',
    resave: false,
    saveUninitialized: false
  })
)
app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(router)
app.listen(port, () => console.log(`http://localhost:${port}`))
