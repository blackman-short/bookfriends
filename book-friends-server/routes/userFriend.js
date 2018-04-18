const express = require('express')
const router = express.Router()
const userFriendController = require('../controllers/userFriendController')

const routers = router
  .post('/add', userFriendController.addFriend)
  .post('/delete', userFriendController.deleteFriend)
  .get('/query', userFriendController.queryFriendsInfo)

module.exports = routers
