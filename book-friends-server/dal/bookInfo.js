const BookInfo = require('../models').BookInfo

async function saveBook (data) {
  if (data) {
    const bookInfo = new BookInfo({
      isbn: data.isbn13,
      author: data.author, // 作者
      translator: data.translator, // 译者
      title: data.title, // 书名
      originTitle: data.origin_title, // 书的原名
      publisher: data.publisher, // 出版社
      images: data.images, // 图片路径集合： small, middle, large.
      price: data.price, // 价格： douban '89.00元'
      catalog: data.catalog, // 目录
      summary: data.summary // 综述
    })
    await bookInfo.save()
  }
}

async function queryCertainFields () {
  const result = await BookInfo.find({}, '-_id isbn price')
  return result
}

async function pageQuery () {
  const result = await BookInfo.find({}).skip(5).limit(5)
  return result
}

exports.pageQuery = pageQuery
exports.queryCertainFields = queryCertainFields
exports.saveBook = saveBook
