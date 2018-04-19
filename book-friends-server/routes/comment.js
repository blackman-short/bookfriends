const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

const routers = router
  .post('/publish', commentController.addCommentOfDynamic)
  .post('/infos', commentController.queryCommentsByDynamicId)

module.exports = routers
