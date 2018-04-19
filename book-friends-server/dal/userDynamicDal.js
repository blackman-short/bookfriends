const UserDynamicInfo = require('../models').UserDynamicInfo

/**
 * Publishes one dynamic.
 * @param {*Object} dynamicInfo
 */
async function addDynamicInfo (dynamicInfo) {
  if (dynamicInfo) {
    const userDynamicInfo = new UserDynamicInfo(dynamicInfo)
    await userDynamicInfo.save()
  }
}

/**
 * Querys the certain user's dynamical info.
 * @param {*String} userId
 */
async function queryDynamicInfosByUserId (userId) {
  let data = null

  if (userId) {
    data = await UserDynamicInfo.find({userId: userId, isActive: true})
  }

  return data
}

/**
 * Querys the certain dynamic info's comments.
 * @param {*String} dynamicId
 */
async function queryCommentsByDynamicId (dynamicId) {
  let data = null

  if (dynamicId) {
    data = await UserDynamicInfo.findOne({id: dynamicId, isActive: true})
  }

  return data
}

exports.addDynamicInfo = addDynamicInfo
exports.queryCommentsByDynamicId = queryCommentsByDynamicId
exports.queryDynamicInfosByUserId = queryDynamicInfosByUserId
