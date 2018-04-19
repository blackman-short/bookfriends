const UserDynamicInfo = require('../models').UserDynamicInfo

/**
 * Publishes one dynamic.
 * @param {*Object} dynamicInfo
 */
async function addDynamicInfo (dynamicInfo) {
  let result = null

  if (dynamicInfo) {
    const userDynamicInfo = new UserDynamicInfo(dynamicInfo)
    result = await userDynamicInfo.save()
  }

  return result
}

/**
 * Adds likeCount for one dynamic.
 * @param {*String} dynamicId
 */
async function updateDynamicLikeCount (dynamicId) {
  let data = null

  if (dynamicId) {
    const find = await UserDynamicInfo.findOne({id: dynamicId, isActive: true})
    if (find) {
      data = await UserDynamicInfo.update({id: dynamicId}, {likeCount: find.likeCount + 1})
    }
  }

  return data
}

/**
 * Querys the certain user's dynamical info.
 * @param {*String} userId
 */
async function queryDynamicIdsByUserId (userId) {
  let ids = []

  if (userId) {
    ids = await UserDynamicInfo.find({userId: userId, isActive: true}, '-_id id createTime').sort({'createTime': -1})
  }

  return ids
}

/**
 * Querys the certain dynamic info's comments.
 * @param {*String} dynamicId
 */
async function queryDynamicInfoByDynamicId (dynamicId) {
  let data = null

  if (dynamicId) {
    data = await UserDynamicInfo.findOne({id: dynamicId, isActive: true}, '-_id id content likeCount createTime')
  }

  return data
}

exports.addDynamicInfo = addDynamicInfo
exports.updateDynamicLikeCount = updateDynamicLikeCount
exports.queryDynamicIdsByUserId = queryDynamicIdsByUserId
exports.queryDynamicInfoByDynamicId = queryDynamicInfoByDynamicId
