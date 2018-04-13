const BookInfo = require('../models/bookInfo')

/**
 * Querys books from db according to keyword.
 * @param {*String} keyWord 关键字
 */
async function queryBooksByKeyWord (keyWord) {
  let loadData = null

  if (keyWord) {
    loadData = await BookInfo.find({title: keyWord})
  }

  return loadData
}

/**
 * Batches to save books
 * @param {*Array} books
 */
async function saveBooks (books) {
  if (books && books.length > 0) {
    await BookInfo.create(books)
  }
}

exports.saveBooks = saveBooks
exports.queryBooksByKeyWord = queryBooksByKeyWord
