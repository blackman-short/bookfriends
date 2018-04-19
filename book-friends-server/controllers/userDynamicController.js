const validator = require('validator')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userDynamicManager = require('../managers/userDynamicManager')

/**
 * User publishes one dynamic.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function addDynamicInfo (req, res, next) {
  const funcName = 'server: controllers/dynamic/addDynamicInfo'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))

  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.body.userId
  let content = req.body.content
  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!content || (content && !validator.trim(content))) {
      throw new Error('Please provide parameter: content')
    } else {
      userId = validator.trim(userId)
      content = validator.trim(content)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userDynamicManager.addDynamicInfo(userId, content)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * User clicks like.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function updateDynamicLikeCount (req, res, next) {
  const funcName = 'server: controllers/dynamic/updateDynamicLikeCount'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))

  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let dynamicId = req.body.dynamicId
  try {
    if (!dynamicId || (dynamicId && !validator.trim(dynamicId))) {
      throw new Error('Please provide parameter: dynamicId')
    } else {
      dynamicId = validator.trim(dynamicId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userDynamicManager.updateDynamicLikeCount(dynamicId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }
  return res.status(200).send(response)
}

/**
 * Gets the user's all dynamic.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryDynamicInfosByUserId (req, res, next) {
  const funcName = 'server: controllers/dynamic/addCommentOfDynamic'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))

  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.query.userId
  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else {
      userId = validator.trim(userId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userDynamicManager.queryDynamicInfosByUserId(userId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

exports.addDynamicInfo = addDynamicInfo
exports.updateDynamicLikeCount = updateDynamicLikeCount
exports.queryDynamicInfosByUserId = queryDynamicInfosByUserId
