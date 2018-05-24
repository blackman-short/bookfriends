const express = require('express')
const router = express.Router()
const userInfoController = require('../controllers/userController')

const routers = router
  .post('/login', userInfoController.login)
  .post('/offline', userInfoController.offLine)
  .post('/register', userInfoController.register)
  .post('/update', userInfoController.updateInfo)
  .get('/get', userInfoController.getUserInfoByUserId)
  .get('/search', userInfoController.getUsersByKeyword)

module.exports = routers
