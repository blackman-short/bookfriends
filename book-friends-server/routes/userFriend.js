const express = require('express')
const router = express.Router()
const userFriendController = require('../controllers/userFriendController')

const routers = router
  .post('/follow', userFriendController.addFriend)
  .post('/unfollow', userFriendController.deleteFriend)
  .get('/friends', userFriendController.queryFriendsInfo)
  .get('/fans', userFriendController.queryFansInfo)
  .get('/relationship', userFriendController.getRelationBetweenUsers)

module.exports = routers
