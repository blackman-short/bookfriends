const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookInfo')

const routers = router
  .get('/top', bookController.getTopBooks)

module.exports = routers
