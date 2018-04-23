const express = require('express')
const router = express.Router()
const userBookController = require('../controllers/userBookController')

const routers = router
  .post('/unstore', userBookController.unstore)
  .post('/storeup', userBookController.storeUpBook)
  .get('/mybooks', userBookController.getUserBooks)

module.exports = routers
