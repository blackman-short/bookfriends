const UserBookInfo = require('../models').UserBookInfo

/**
 * Querys user's books info according to user ID.
 * @param {*String} userId
 */
async function queryUserBookInfoByUserId (userId) {
  let data = null

  if (userId) {
    data = await UserBookInfo.findOne({userId: userId})
  }

  return data
}

exports.queryUserBookInfoByUserId = queryUserBookInfoByUserId
