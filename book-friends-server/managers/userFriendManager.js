const userDal = require('../dal/userDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userFriendDal = require('../dal/userFriendsDal')

/**
 * User adds friend.
 * @param {*String} userId
 * @param {*String} friendId
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
 * @param {*String} userId
 * @param {*String} friendId
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
 * @param {*String} userId
 */
async function queryFriendsInfo (userId) {
  const funcName = 'server: managers/userfriends/deleteFriend'
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
          const friendInfo = await userDal.queryUserInfoById(id)
          if (friendInfo) {
            friendsInfo.push(friendInfo)
          }
        }
        result = { errorCode: errorCode.SUCCESS, data: friendsInfo }
      } catch (error) {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
        logUtil.logErrorMsg(funcName, result.errorMsg)
        return result
      }
    }
  }

  return result
}

exports.addFriends = addFriends
exports.deleteFriend = deleteFriend
exports.queryFriendsInfo = queryFriendsInfo
