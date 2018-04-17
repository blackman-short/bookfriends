const BookInfo = require('../models').BookInfo
const PAGE_SIZE = require('../config/systemConfig').pageSize

async function saveBook (data) {
  if (data) {
    const find = await BookInfo.find({isbn: data.isbn})
    if (!find) {
      const bookInfo = new BookInfo(data)

      if (data.status === 0) {
        bookInfo.isNews = true
      } else if (data.status === 1) {
        bookInfo.isHot = true
      }
      await bookInfo.save()
    } else {
      await BookInfo.update({isbn: data.isbn}, {isActive: true})
    }
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

/**
 * Querys book by isbn.
 * @param {*String} isbn
 */
async function queryBookByISBN (isbn) {
  let book = null

  if (isbn) {
    book = await BookInfo.findOne({isbn: isbn, isActive: true})
  }

  return book
}

exports.saveBook = saveBook
exports.queryTopBooks = queryTopBooks
exports.queryNewBooks = queryNewBooks
exports.queryHotBooks = queryHotBooks
exports.queryBookByISBN = queryBookByISBN
exports.queryRecommendBooks = queryRecommendBooks
