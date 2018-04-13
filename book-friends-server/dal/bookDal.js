const BookInfo = require('../models').BookInfo
const PAGE_SIZE = require('../config/systemConfig').pageSize

async function saveBook (data) {
  if (data) {
    const bookInfo = new BookInfo({
      isbn: data.isbn13,
      author: data.author, // 作者
      authorIntro: data.author_intro, // 作者介绍
      translator: data.translator, // 译者
      title: data.title, // 书名
      originTitle: data.origin_title, // 书的原名
      publisher: data.publisher, // 出版社
      pubdate: data.pubdate, // 出版时间
      images: data.images, // 图片路径集合： small, middle, large.
      price: data.price, // 价格： douban '89.00元'
      catalog: data.catalog, // 目录
      summary: data.summary, // 综述
      tags: data.tags,
      rating: data.rating.average == null ? 0 : Number(data.rating.average), // 评分
      ebookUrl: data.ebook_url == null ? '' : data.ebook_url // 电子书网址
    })

    if (data.status === 0) {
      bookInfo.isNews = true
    } else if (data.status === 1) {
      bookInfo.isHot = true
    }
    await bookInfo.save()
  }
}

// =============================================================================
// the dev environnment
// =============================================================================

/**
 * Querys new books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryNewBooks (pageIndex, keyWord) {
  let data = null

  // Querys certain books according to current page index.
  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    const regEx = new RegExp(keyWord, 'i')
    data = await BookInfo.find({isNews: true, title: regEx}).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Querys hot books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryHotBooks (pageIndex, keyWord) {
  let data = null

  // Querys certain books according to current page index.
  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    const regEx = new RegExp(keyWord, 'i')
    data = await BookInfo.find({isHot: true, title: regEx}).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Querys recommened books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryRecommendBooks (pageIndex, flags) {
  let data = null

  // Querys certain books according to current page index.
  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    data = await BookInfo.where('flag').in(flags).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Querys books from TOP 250.
 * @param {*Number} pageIndex
 */
async function queryTopBooks (pageIndex) {
  let data = null

  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    data = await BookInfo.find({isNews: false, isHot: false}).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

exports.saveBook = saveBook
exports.queryTopBooks = queryTopBooks
exports.queryNewBooks = queryNewBooks
exports.queryHotBooks = queryHotBooks
exports.queryRecommendBooks = queryRecommendBooks
