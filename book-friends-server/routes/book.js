const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const routers = router
  .post('/save', bookController.saveBook)
  .get('/new', bookController.getNewBooks)
  .get('/hot', bookController.getHotBooks)

module.exports = routers
