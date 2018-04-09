const doubanConfig = require('../../config/douban_config')
const request = require('../../common/common_request')

async function getBookInfoByISBN (isbn) {
  let bookInfo = null

  if (isbn) {
    const reqUrl = doubanConfig.getBookByISBNUrl() + isbn
  }

  return bookInfo
}

exports.getBookInfoByISBN = getBookInfoByISBN
