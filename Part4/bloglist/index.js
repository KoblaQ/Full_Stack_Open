require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const Blog = require('./models/blog')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// const app = express()

// const mongoUrl = process.env.MONGODB_URI
// mongoose.connect(mongoUrl)

// app.use(express.json())

const PORT = 3003
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
