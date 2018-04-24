const express = require('express')
const router = express.Router()
const dynamicController = require('../controllers/userDynamicController')

const routers = router
  .get('/all', dynamicController.getAllDynamics)
  .post('/publish', dynamicController.addDynamicInfo)
  .post('/like', dynamicController.updateDynamicLikeCount)
  .get('/friends', dynamicController.queryFriendDynamics)
  .get('/infos', dynamicController.queryDynamicInfosByUserId)

module.exports = routers
