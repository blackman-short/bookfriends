const express = require('express')
const router = express.Router()
const userBookController = require('../controllers/userBookController')

const routers = router
  .post('/storeup', userBookController.storeUpBook)

module.exports = routers
