const validator = require('validator')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userFriendManager = require('../managers/userFriendManager')

/**
 * User adds one friend.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function addFriend (req, res, next) {
  const funcName = 'server: controllers/userFriend/addFriend'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.body.userId
  let friendId = req.body.friendId

  try {
    if (!userId && (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!friendId && (friendId && !validator.trim(friendId))) {
      throw new Error('Please provide parameter: friendId')
    } else {
      userId = validator.trim(userId)
      friendId = validator.trim(friendId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userFriendManager.addFriends(userId, friendId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }
  return res.status(200).send(response)
}

/**
 * User deletes one friend.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteFriend (req, res, next) {
  const funcName = 'server: controllers/userFriend/deleteFriend'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.body.userId
  let friendId = req.body.friendId

  try {
    if (!userId && (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!friendId && (friendId && !validator.trim(friendId))) {
      throw new Error('Please provide parameter: friendId')
    } else {
      userId = validator.trim(userId)
      friendId = validator.trim(friendId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userFriendManager.deleteFriend(userId, friendId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }
  return res.status(200).send(response)
}

/**
 * Querys user's friends' info.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryFriendsInfo (req, res, next) {
  const funcName = 'server: controllers/userFriend/queryFriendsInfo'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.query.userId
  try {
    if (!userId && (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else {
      userId = validator.trim(userId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userFriendManager.queryFriendsInfo(userId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Querys user's fans' info.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryFansInfo (req, res, next) {
  const funcName = 'server: controllers/userFriend/queryFansInfo'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.query.userId
  try {
    if (!userId && (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else {
      userId = validator.trim(userId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userFriendManager.queryFansInfo(userId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Gets the relationship between the user and friend.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getRelationBetweenUsers (req, res, next) {
  const funcName = 'server: controllers/userFriend/getRelationBetweenUsers'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.query.userId
  let friendId = req.query.friendId
  try {
    if (!userId && (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!friendId && (friendId && !validator.trim(friendId))) {
      throw new Error('Please provide parameter: friendId')
    } else {
      userId = validator.trim(userId)
      friendId = validator.trim(friendId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userFriendManager.getRelationBetweenUsers(userId, friendId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

exports.addFriend = addFriend
exports.deleteFriend = deleteFriend
exports.queryFansInfo = queryFansInfo
exports.queryFriendsInfo = queryFriendsInfo
exports.getRelationBetweenUsers = getRelationBetweenUsers
