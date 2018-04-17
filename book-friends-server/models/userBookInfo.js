const mongoose = require('mongoose')
const tools = require('../utils/tools')

const userBookSchema = mongoose.Schema({
  id: { type: String, default: tools.getUUID() },
  userId: { type: String, index: true },
  isbn: { type: String },
  tags: [String], // 书类型: 取豆瓣前三tag
  createTime: { type: String, default: tools.getCurrentTime() }
})

userBookSchema.index({userId: 1, isbn: -1})

mongoose.model('userbook', userBookSchema)
