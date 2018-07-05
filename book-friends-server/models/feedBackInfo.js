const mongoose = require('mongoose')
const tools = require('../utils/tools')

const FeedBackSchema = new mongoose.Schema({
  id: { type: String, default: tools.getUUID },
  userId: { type: String }, // 用户ID
  content: { type: String }, // 反馈的内容
  createTime: { type: String, default: tools.getCurrentTime } // 创建时间
})

mongoose.model('feedback', FeedBackSchema)
