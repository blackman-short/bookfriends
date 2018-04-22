const mongoose = require('mongoose')
const tools = require('../utils/tools')
// const CommentSchema = require('./commentInfo')

const userDynamicSchema = new mongoose.Schema({
  id: { type: String, default: tools.getUUID() },
  userId: { type: String, index: true }, // 用户ID
  content: { type: String }, // 动态的内容
  // comments: { type: [CommentSchema], default: [] }, // 动态的评论
  likeCount: { type: Number, default: 0 }, // 动态的点赞数
  isbn: { type: String }, // 动态相关的书籍的ISBN
  createTime: { type: String, default: tools.getCurrentTime() }, // 创建时间
  updateTime: { type: String, default: tools.getCurrentTime() }, // 更改时间
  isActive: { type: Boolean, default: true }
})

mongoose.model('userDynamic', userDynamicSchema)
