const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const UserBookInfo = require('../models').UserBookInfo

/**
 * Querys user's books info according to user ID.
 * @param {*String} userId
 */
async function queryUserBookInfoByUserId (userId) {
  let data = null

  if (userId) {
    data = await UserBookInfo.find({id: userId})
  }

  return data
}

/**
 * User stores up one book.
 * @param {*String} userId 用户ID
 * @param {*String} isbn 书籍的标识ISBN
 * @param {*Array} tags 该书的标签
 */
async function storeUpBook (userId, isbn, tags) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userId && isbn && tags) {
    const find = UserBookInfo.find({isbn: isbn, userId: userId})
    if (!find) {
      const storeBookInfo = new UserBookInfo({
        userId: userId,
        isbn: isbn,
        tags: tags
      })
      await storeBookInfo.save()
      result = { errorCode: errorCode.SUCCESS }
    } else {
      result = { errorCode: errorCode.ERROR_BOOK_HASSTORED, errorMsg: errorMsg.ERROR_BOOK_HASSTORED }
    }
  }

  return result
}

exports.storeUpBook = storeUpBook
exports.queryUserBookInfoByUserId = queryUserBookInfoByUserId
