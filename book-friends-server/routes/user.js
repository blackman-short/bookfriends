const express = require('express')
const router = express.Router()
const userInfoController = require('../controllers/userController')

const routers = router
  .post('/login', userInfoController.login)
  .post('/register', userInfoController.register)
  .post('/update', userInfoController.updateInfo)
  .get('/search', userInfoController.getUsersByKeyword)
  .get('/get', userInfoController.getUserInfoByUserId)

module.exports = routers
