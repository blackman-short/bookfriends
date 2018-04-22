const express = require('express')
const router = express.Router()
const userFriendController = require('../controllers/userFriendController')

const routers = router
  .post('/add', userFriendController.addFriend)
  .post('/delete', userFriendController.deleteFriend)
  .get('/friends', userFriendController.queryFriendsInfo)
  .get('/fans', userFriendController.queryFansInfo)

module.exports = routers
