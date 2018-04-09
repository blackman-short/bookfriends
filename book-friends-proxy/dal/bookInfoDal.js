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

exports.queryBooksByKeyWord = queryBooksByKeyWord
