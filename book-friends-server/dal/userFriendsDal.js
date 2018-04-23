const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const UserFriendInfo = require('../models').UserFriendInfo

/**
 * User adds one friend.
 * @param {*String} userId
 * @param {*String} friendId
 */
async function addFriend (userId, friendId) {
  const funcName = 'server: dals/userFriends/addFriend'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  if (userId && friendId) {
    const find = await UserFriendInfo.findOne({userId: userId, friendId: friendId, isActive: true})
    if (find) {
      result = { errorCode: errorCode.ERROR_FRIEND_HASADDED, errorMsg: errorMsg.ERROR_FRIEND_HASADDED }
      logUtil.logDebugMsg(funcName, result.errorMsg)
      return result
    } else {
      const findOne = await UserFriendInfo.findOne({userId: userId, friendId: friendId})
      if (findOne) {
        await UserFriendInfo.update({userId: userId, friendId: friendId}, {isActive: true})
        result = { errorCode: errorCode.SUCCESS }
      } else {
        const userFriendInfo = new UserFriendInfo({
          userId: userId,
          friendId: friendId
        })

        await userFriendInfo.save()
        result = { errorCode: errorCode.SUCCESS }
      }
    }
  }

  return result
}

/**
 * User removes one friend.
 * @param {*String} userId
 * @param {*String} friendId
 */
async function deleteFriend (userId, friendId) {
  const funcName = 'server: dals/userFriends/addFriend'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userId && friendId) {
    const find = await UserFriendInfo.findOne({userId: userId, friendId: friendId, isActive: true})
    // If the friend does not exist.
    if (!find) {
      result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
      logUtil.logDebugMsg(funcName, result.errorMsg)
      return result
    }

    // else logical delete the friend.
    await UserFriendInfo.update({userId: userId, friendId: friendId}, {isActive: false})
    result = { errorCode: errorCode.SUCCESS }
  }

  return result
}

/**
 * Querys the certain user's all friends' ID.
 * @param {*String} userId
 */
async function queryFriendIdsByUserId (userId) {
  let ids = []

  if (userId) {
    const userFriends = await UserFriendInfo.find({userId: userId, isActive: true}, '-_id friendId')
    if (userFriends && userFriends.length > 0) {
      userFriends.forEach(item => {
        if (ids.indexOf(item.friendId) < 0) {
          ids.push(item.friendId)
        }
      })
    }
  }

  return ids
}

/**
 * Querys the users' id follows the certain user.
 * @param {*String} userId
 */
async function queryFanIdsByUserId (userId) {
  let ids = []

  if (userId) {
    const userFriends = await UserFriendInfo.find({friendId: userId, isActive: true}, '-_id userId')
    if (userFriends && userFriends.length > 0) {
      userFriends.forEach(item => {
        if (ids.indexOf(item.userId) < 0) {
          ids.push(item.userId)
        }
      })
    }
  }

  return ids
}

/**
 * Validates the another user is the user's friend.
 * @param {*String} userId
 * @param {*String} friendId
 */
async function isFriend (userId, friendId) {
  let isFriend = false
  if (userId && friendId) {
    const data = await UserFriendInfo.findOne({userId: userId, friendId: friendId, isActive: true})
    if (data) {
      isFriend = true
    }
  }
  return isFriend
}

/**
 * Validates the another user is the user's fans.
 * @param {*String} userId
 * @param {*String} friendId
 */
async function isFans (userId, friendId) {
  let isFans = false
  if (userId && friendId) {
    const data = await UserFriendInfo.findOne({userId: userId, friendId: friendId, isActive: true})
    if (data) {
      isFans = true
    }
  }
  return isFans
}

exports.isFans = isFans
exports.isFriend = isFriend
exports.addFriend = addFriend
exports.deleteFriend = deleteFriend
exports.queryFanIdsByUserId = queryFanIdsByUserId
exports.queryFriendIdsByUserId = queryFriendIdsByUserId
