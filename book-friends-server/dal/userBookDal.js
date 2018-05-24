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
    data = await UserBookInfo.find({userId: userId}, '-_id -__v')
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
    const find = await UserBookInfo.findOne({isbn: isbn, userId: userId})

    if (find) {
      result = { errorCode: errorCode.ERROR_BOOK_HASSTORED, errorMsg: errorMsg.ERROR_BOOK_HASSTORED }
    } else {
      let storeBookInfo = new UserBookInfo({
        userId: userId,
        isbn: isbn,
        tags: tags
      })

      const findId = await UserBookInfo.findOne({id: storeBookInfo.id})
      if (findId) {
        storeBookInfo.id = findId.id + '1'
      }
      await storeBookInfo.save()
      result = { errorCode: errorCode.SUCCESS }
    }
  }

  return result
}

/**
 * User unstores one book.
 * @param {*String} userId
 * @param {*String} isbn
 */
async function unstore (userId, isbn) {
  let data = null

  if (userId && isbn) {
    data = await UserBookInfo.deleteOne({userId: userId, isbn: isbn})
  }

  return data
}

/**
 * Gets userbook by userIdand isbn.
 * @param {*String} userId
 * @param {*String} isbn
 */
async function getUserBookByUserIdAndISBN (userId, isbn) {
  let data = null

  if (userId && isbn) {
    data = await UserBookInfo.findOne({userId: userId, isbn: isbn})
  }

  return data
}

/**
 * Querys all infos.
 */
async function queryAll () {
  let infos = null

  infos = await UserBookInfo.find({}, '-_id isbn userId tags')

  return infos
}

exports.unstore = unstore
exports.queryAll = queryAll
exports.storeUpBook = storeUpBook
exports.queryUserBookInfoByUserId = queryUserBookInfoByUserId
exports.getUserBookByUserIdAndISBN = getUserBookByUserIdAndISBN
