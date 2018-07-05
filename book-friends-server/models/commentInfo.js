const mongoose = require('mongoose')
const tools = require('../utils/tools')

const commentInfoSchema = new mongoose.Schema({
  id: { type: String, default: tools.getUUID },
  dynamicId: { type: String, index: true }, // 所属的动态ID
  userId: { type: String, index: true }, // 用户ID
  content: { type: String }, // 评论内容
  likeCount: { type: Number, default: 0 }, // 评论点赞数
  createTime: { type: String, default: tools.getCurrentTime }, // 创建时间
  updateTime: { type: String, default: tools.getCurrentTime }, // 更新时间
  isActive: { type: Boolean, default: true }
})

mongoose.model('comment', commentInfoSchema)
