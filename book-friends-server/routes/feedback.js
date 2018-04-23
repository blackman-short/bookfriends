const express = require('express')
const router = express.Router()
const feedBackController = require('../controllers/feedBackController')

const routers = router
  .post('/publish', feedBackController.publish)

module.exports = routers
