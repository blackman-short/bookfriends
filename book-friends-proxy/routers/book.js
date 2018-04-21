const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

const routers = router
  .get('/search', bookController.searchBooks)
  .post('/recommend', bookController.getRecommendBooks)
  .post('/querybyisbn', bookController.getBookInfoByISBN)

module.exports = routers
