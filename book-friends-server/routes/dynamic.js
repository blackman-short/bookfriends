const express = require('express')
const router = express.Router()
const dynamicController = require('../controllers/userDynamicController')

const routers = router
  .post('/publish', dynamicController.addDynamicInfo)
  .post('/like', dynamicController.updateDynamicLikeCount)
  .get('/infos', dynamicController.queryDynamicInfosByUserId)

module.exports = routers
