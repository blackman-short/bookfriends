const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookInfo')
const routers = router
  .post('/save', bookController.saveBook)

module.exports = routers
