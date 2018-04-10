const mongoose = require('mongoose')

const bookInfoSchema = mongoose.Schema({
  isbn: { type: String, index: true }, // isbn
  author: { type: Array }, // 作者
  translator: { type: Array }, // 译者
  title: { type: String }, // 书名
  originTitle: { type: String }, // 书的原名
  publisher: { type: String }, // 出版社
  images: { type: JSON }, // 图片路径集合： small, middle, large.
  price: { type: String }, // 价格： douban '89.00元'
  catalog: { type: String }, // 目录
  isNews: { type: Boolean },
  isRecommend: { type: Boolean },
  isHot: { type: Boolean },
  summary: { type: String }, // 综述
  flags: { type: JSON }
})

mongoose.model('book', bookInfoSchema)
