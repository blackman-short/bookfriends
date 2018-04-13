const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

const routers = router
  .post('/recommend', bookController.getRecommendBooks)

module.exports = routers
