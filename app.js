const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const router = require('./routes')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')
const helpers = require('./utils')
const hbs = engine({ extname: '.hbs', helpers })
const app = express()
const port = 3000
// Set up view engine
app.engine('.hbs', hbs)
app.set('view engine', '.hbs')
app.set('views', './views')
// Serve static files from the "public" directory
app.use(express.static('public'))
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))
// Middleware to parse JSON bodies
app.use(express.json())
// Middleware to support HTTP method overrides (e.g., PUT and DELETE)
app.use(methodOverride('_method'))
// Load environment variables in development mode
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
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
// Custom message handler middleware
app.use(messageHandler)
// Main router middleware (must go after all setup middleware)
app.use(router)
// Error handler middleware (should be the last one)
app.use(errorHandler)
// Start the server and listen on the specified port
app.listen(port, () => console.log(`http://localhost:${port}`))
