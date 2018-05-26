const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const UserBookInfo = require('../models').UserBookInfo
const PAGE_SIZE = require('../config/systemConfig').pageSize

/**
 * Querys user's books info according to user ID.
 * @param {String} userId
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
 * @param {String} userId 用户ID
 * @param {String} isbn 书籍的标识ISBN
 * @param {Array} tags 该书的标签
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
 * @param {String} userId
 * @param {String} isbn
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
 * @param {String} userId
 * @param {String} isbn
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

async function groupUserBooksByISBN () {
  const data = await UserBookInfo.aggregate([ {$group: {'_id': {'isbn': '$isbn'}, 'number': {$sum: 1}}}, { $project: { '_id': 0, 'isbn': '$_id.isbn', 'number': 1 } } ]).sort({'number': -1}).limit(PAGE_SIZE)
  return data
}

async function queryUserIdsByIsbns (isbns) {
  let userIds = []
  const loadData = await UserBookInfo.find({'isbn': {'$in': isbns}}, '-_id userId')

  if (loadData && loadData.length > 0) {
    loadData.forEach(d => {
      if (userIds.indexOf(d.userId) < 0) {
        userIds.push(d.userId)
      }
    })
  }

  return userIds
}

exports.unstore = unstore
exports.queryAll = queryAll
exports.storeUpBook = storeUpBook
exports.queryUserIdsByIsbns = queryUserIdsByIsbns
exports.groupUserBooksByISBN = groupUserBooksByISBN
exports.queryUserBookInfoByUserId = queryUserBookInfoByUserId
exports.getUserBookByUserIdAndISBN = getUserBookByUserIdAndISBN
