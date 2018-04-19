const validator = require('validator')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const commentManager = require('../managers/commentManager')

/**
 * Gets the comments of one certain dynamic.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryCommentsByDynamicId (req, res, next) {
  const funcName = 'server: controllers/comment/addCommentOfDynamic'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))

  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let dynamicId = req.query.dynamicId
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
      response = await commentManager.queryCommentsByDynamicId(dynamicId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * User published one comments on certain dynamic.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function addCommentOfDynamic (req, res, next) {
  const funcName = 'server: controllers/comment/addCommentOfDynamic'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))

  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let dynamicId = req.body.dynamicId // 该条动态的ID
  let userId = req.body.userId // 评论人的ID
  let content = req.body.content
  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!content || (content && !validator.trim(content))) {
      throw new Error('Please provide parameter: content')
    } else if (!dynamicId || (dynamicId && !validator.trim(dynamicId))) {
      throw new Error('Please provide parameter: dynamicId')
    } else {
      userId = validator.trim(userId)
      content = validator.trim(content)
      dynamicId = validator.trim(dynamicId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    let commentInfo = {
      userId: userId,
      content: content
    }
    try {
      response = await commentManager.addCommentOfDynamic(dynamicId, commentInfo)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

exports.addCommentOfDynamic = addCommentOfDynamic
exports.queryCommentsByDynamicId = queryCommentsByDynamicId
