const tools = require('../utils/tools')
const UserDynamicInfo = require('../models').UserDynamicInfo
const PAGE_SIZE = require('../config/systemConfig').pageSize

/**
 * Publishes one dynamic.
 * @param {Object} dynamicInfo
 */
async function addDynamicInfo (dynamicInfo) {
  let result = null

  if (dynamicInfo) {
    let userDynamicInfo = new UserDynamicInfo(dynamicInfo)
    const findId = await UserDynamicInfo.findOne({id: userDynamicInfo.id})
    if (findId) {
      userDynamicInfo.id = findId.id + '1'
    }
    result = await userDynamicInfo.save()
  }

  return result
}

/**
 * Adds likeCount for one dynamic.
 * @param {String} dynamicId
 */
async function updateDynamicLikeCount (dynamicId) {
  let data = null

  if (dynamicId) {
    const find = await UserDynamicInfo.findOne({id: dynamicId, isActive: true})
    if (find) {
      data = await UserDynamicInfo.update({id: dynamicId}, {likeCount: find.likeCount + 1, updateTime: tools.getCurrentTime()})
    }
  }

  return data
}

/**
 * Querys the certain user's dynamical info.
 * @param {String} userId
 * @param {Number} pageIndex
 */
async function queryDynamicIdsByUserId (userId, pageIndex) {
  let ids = []

  if (userId && pageIndex > 0) {
    const skipCount = (pageIndex - 1) * PAGE_SIZE
    ids = await UserDynamicInfo.find({userId: userId, isActive: true}, '-_id id createTime').sort({'createTime': -1})
      .skip(skipCount).limit(PAGE_SIZE)
  }

  return ids
}

/**
 * Querys dynamic ids of userIds.
 * @param {Array} userIds
 * @param {Number} pageIndex
 */
async function queryDynamicIdsByUserIds (userIds, pageIndex) {
  let ids = []

  if (userIds && pageIndex > 0) {
    const skipCount = (pageIndex - 1) * PAGE_SIZE
    ids = await UserDynamicInfo.find({userId: {$in: userIds}, isActive: true}, '-_id id createTime').sort({'createTime': -1})
      .skip(skipCount).limit(PAGE_SIZE)
  }

  return ids
}

/**
 * Querys the all dynamic infos.
 * @param {Number} pageIndex
 */
async function queryAllDynamicInfos (pageIndex) {
  let ids = null

  if (pageIndex > 0) {
    const skipCount = (pageIndex - 1) * PAGE_SIZE
    ids = await UserDynamicInfo.find({isActive: true}, '-_id id createTime').sort({'createTime': -1})
      .skip(skipCount).limit(PAGE_SIZE)
  }

  return ids
}

/**
 * Querys the certain dynamic info's comments.
 * @param {String} dynamicId
 */
async function queryDynamicInfoByDynamicId (dynamicId) {
  let data = null

  if (dynamicId) {
    data = await UserDynamicInfo.findOne({id: dynamicId, isActive: true}, '-_id id content likeCount createTime isbn userId')
  }

  return data
}

/**
 * Querys the certain book's dynamics
 * @param {String} isbn
 */
async function queryDynamicsByISBN (isbn) {
  let data = null

  if (isbn) {
    data = await UserDynamicInfo.find({isbn: isbn, isActive: true}, '-_id id content likeCount createTime isbn userId')
  }

  return data
}

/**
 * Querys today's dynamics.
 */
async function queryTodayDynamics () {
  let data = null
  const currentTime = tools.getCurrentDate()
  const begin = currentTime + ' 00:00:00'
  const end = currentTime + ' 23:59:59'
  data = await UserDynamicInfo.find({isActive: true, createTime: { $gte: begin, $lte: end }}, '-_id userId isbn createTime').sort({'createTime': -1})

  return data
}

exports.addDynamicInfo = addDynamicInfo
exports.queryTodayDynamics = queryTodayDynamics
exports.queryDynamicsByISBN = queryDynamicsByISBN
exports.queryAllDynamicInfos = queryAllDynamicInfos
exports.updateDynamicLikeCount = updateDynamicLikeCount
exports.queryDynamicIdsByUserId = queryDynamicIdsByUserId
exports.queryDynamicIdsByUserIds = queryDynamicIdsByUserIds
exports.queryDynamicInfoByDynamicId = queryDynamicInfoByDynamicId
