const express = require('express')
const router = express.Router()
const dynamicController = require('../controllers/userDynamicController')

const routers = router
  .get('/all', dynamicController.getAllDynamics)
  .get('/book', dynamicController.queryDynamicsByISBN)
  .post('/publish', dynamicController.addDynamicInfo)
  .get('/friends', dynamicController.queryFriendDynamics)
  .post('/like', dynamicController.updateDynamicLikeCount)
  .get('/infos', dynamicController.queryDynamicInfosByUserId)

module.exports = routers
