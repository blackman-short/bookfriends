const tools = require('../utils/tools')
const mongoose = require('mongoose')

const userFriendSchame = mongoose.Schema({
  id: { type: String, default: tools.getUUID() },
  userId: { type: String },
  friendId: { type: String },
  isAvtive: { type: Boolean, default: true }
})

mongoose.model('userfriend', userFriendSchame)
