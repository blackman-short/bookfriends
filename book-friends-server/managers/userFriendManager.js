const userDal = require('../dal/userDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userFriendDal = require('../dal/userFriendsDal')

/**
 * User adds friend.
 * @param {String} userId
 * @param {String} friendId
 */
async function addFriends (userId, friendId) {
  const funcName = 'server: managers/userfriends/addFriends'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userId && friendId) {
    try {
      // Validates the user is valid.
      const user = await userDal.queryUserInfoById(userId)
      if (!user) {
        result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
        logUtil.logDebugMsg(funcName, result.errorMsg + `userId: ${userId}`)
        return result
      }

      // If the user is valid.
      result = await userFriendDal.addFriend(userId, friendId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

/**
 * User deletes friend.
 * @param {String} userId
 * @param {String} friendId
 */
async function deleteFriend (userId, friendId) {
  const funcName = 'server: managers/userfriends/deleteFriend'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userId && friendId) {
    try {
      // Validates the user is valid.
      const user = await userDal.queryUserInfoById(userId)
      if (!user) {
        result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
        logUtil.logDebugMsg(funcName, result.errorMsg + `userId: ${userId}`)
        return result
      }

      // If the user is valid.
      result = await userFriendDal.deleteFriend(userId, friendId)
    } catch (error) {
      result = { errroCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_DELETE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

/**
 * Querys the certain user's friends info.
 * @param {String} userId
 */
async function queryFriendsInfo (userId) {
  const funcName = 'server: managers/userfriends/queryFriendsInfo'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  if (userId) {
    // 1. gets the user's friends' ids.
    let ids = []
    try {
      ids = await userFriendDal.queryFriendIdsByUserId(userId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    // 2. get the friend's info by id.
    let friendsInfo = []
    if (ids.length > 0) {
      try {
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i]
          const friendInfo = await userDal.queryUserCertainFieldsById(id)
          if (friendInfo) {
            friendsInfo.push(friendInfo)
          }
        }
      } catch (error) {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
        logUtil.logErrorMsg(funcName, result.errorMsg)
        return result
      }
    }

    result = { errorCode: errorCode.SUCCESS, data: friendsInfo }
  }

  return result
}

/**
 *
 * Querys the user's fans.
 * @param {String} userId
 */
async function queryFansInfo (userId) {
  const funcName = 'server: managers/userfriends/queryFansInfo'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  if (userId) {
    // 1. gets the user's fans' ids.
    let ids = []
    try {
      ids = await userFriendDal.queryFanIdsByUserId(userId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    // 2. get the fans' info by id.
    let friendsInfo = []
    if (ids.length > 0) {
      try {
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i]
          const friendInfo = await userDal.queryUserCertainFieldsById(id)
          if (friendInfo) {
            friendsInfo.push(friendInfo)
          }
        }
      } catch (error) {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
        logUtil.logErrorMsg(funcName, result.errorMsg)
        return result
      }
    }

    result = { errorCode: errorCode.SUCCESS, data: friendsInfo }
  }

  return result
}

/**
 * Gets the relationship between the user and friend.
 * @param {String} userId
 * @param {String} friendId
 */
async function getRelationBetweenUsers (userId, friendId) {
  const funcName = 'server: managers/userfriends/getRelationBetweenUsers'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userId && friendId) {
    let loadResults = null

    try {
      const friendInfo = await userDal.queryUserInfoById(friendId)
      if (!friendInfo) {
        result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
        logUtil.logDebugMsg(funcName, result.errorMsg + `friendId: ${friendId}`)
        return result
      }
      loadResults = await Promise.all([userFriendDal.isFriend(userId, friendId), userFriendDal.isFans(friendId, userId)]).then()
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    if (loadResults && loadResults.length === 2) {
      const isFriend = loadResults[0]
      const isFans = loadResults[1]
      if (isFriend) {
        if (isFans) {
          result = { errorCode: errorCode.SUCCESS, data: 2 } // 互相关注
        } else {
          result = { errorCode: errorCode.SUCCESS, data: 1 } // 已关注
        }
      } else {
        if (isFans) {
          result = { errorCode: errorCode.SUCCESS, data: -1 } // 已被关注
        } else {
          result = { errorCode: errorCode.SUCCESS, data: 0 } // 互相没有关注
        }
      }
    }
  }

  return result
}

exports.addFriends = addFriends
exports.deleteFriend = deleteFriend
exports.queryFansInfo = queryFansInfo
exports.queryFriendsInfo = queryFriendsInfo
exports.getRelationBetweenUsers = getRelationBetweenUsers
