const mongoose = require('mongoose')

const bookInfoSchema = mongoose.Schema({
  isbn: { type: String }, // isbn
  author: { type: Array }, // 作者
  translator: { type: Array }, // 译者
  title: { type: String }, // 书名
  originTitle: { type: String }, // 书的原名
  publisher: { type: String }, // 出版社
  images: { type: JSON }, // 图片路径集合： small, middle, large.
  price: { type: String }, // 价格： douban '89.00元'
  summary: { type: String } // 综述
})

mongoose.model('book', bookInfoSchema)
