const express = require('express')
const app = express()

const { engine } = require('express-handlebars')
const { helpers } = require('./utils')
const hbs = engine({ extname: '.hbs', helpers })

const methodOverride = require('method-override')

const session = require('express-session')
const flash = require('connect-flash')
// Load environment variables in development mode
if (process.env.NODE_ENV === 'development') require('dotenv').config()
const passport = require('passport')
const auth = require('./auth')

const { messageHandler, errorHandler } = require('./middlewares')

const router = require('./routes')

const port = 3000
// Set up view engine
app.engine('.hbs', hbs)
app.set('view engine', '.hbs')
app.set('views', './views')
// Serve static files from the "public" directory
app.use(express.static('public'))
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))
// Middleware to support HTTP method overrides (e.g., PUT and DELETE)
app.use(methodOverride('_method'))
// Session management middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
// Flash message middleware (must be used after session)
app.use(flash())
// Initialize passport
auth(passport)
app.use(passport.initialize())
app.use(passport.session())
// Custom message handler middleware
app.use(messageHandler)
// Main router middleware (must go after all setup middleware)
app.use(router)
// Error handler middleware (should be the last one)
app.use(errorHandler)
// Start the server and listen on the specified port
app.listen(port, () => console.log(`http://localhost:${port}`))
