const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookInfo')
const routers = router
  .post('/save', bookController.saveBook)
  .get('/new', bookController.getNewBooks)

module.exports = routers
