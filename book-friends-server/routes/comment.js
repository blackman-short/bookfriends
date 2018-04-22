const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

const routers = router
  .post('/like', commentController.likeComment)
  .post('/publish', commentController.addCommentOfDynamic)
  .get('/infos', commentController.queryCommentsByDynamicId)

module.exports = routers
