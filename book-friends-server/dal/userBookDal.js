const UserBookInfo = require('../models').UserBookInfo

/**
 * Querys user's books info according to user ID.
 * @param {*String} userId
 */
async function queryUserBookInfoByUserId (userId) {
  let datas = null

  if (userId) {
    datas = await UserBookInfo.find({id: userId})
  }

  return datas
}

exports.queryUserBookInfoByUserId = queryUserBookInfoByUserId
