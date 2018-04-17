const mongoose = require('mongoose')

const bookInfoSchema = mongoose.Schema({
  isbn: { type: String, index: true }, // isbn
  author: { type: Array }, // 作者
  authorIntro: { type: String }, // 作者介绍
  translator: { type: Array }, // 译者
  title: { type: String }, // 书名
  originTitle: { type: String }, // 书的原名
  publisher: { type: String }, // 出版社
  pubdate: { type: String }, // 出版时间
  images: { type: JSON }, // 图片路径集合： small, middle, large.
  price: { type: String }, // 价格： douban '89.00元'
  catalog: { type: String }, // 目录
  isNews: { type: Boolean },
  isHot: { type: Boolean },
  summary: { type: String }, // 综述
  tags: [JSON], // 书的标签
  ebookUrl: { type: String }, // 电子书网址
  rating: { type: Number, default: 0 }, // 评分
  isActive: { type: Boolean, default: true }
})

mongoose.model('book', bookInfoSchema)
