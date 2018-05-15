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
  let isbn = req.body.isbn

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
      response = await userDynamicManager.addDynamicInfo(userId, content, isbn)
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
  let pageIndex = req.query.pageIndex
  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: pageIndex')
    } else {
      userId = validator.trim(userId)
      pageIndex = parseInt(pageIndex)
      if (pageIndex < 1) {
        throw new Error('pageIndex shoule be > 1')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userDynamicManager.queryDynamicInfosByUserId(userId, pageIndex)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Gets all dynamics.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getAllDynamics (req, res, next) {
  const funcName = 'server: controllers/dynamic/getAllDynamics'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.query))
  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameter errors.
  let pageIndex = req.query.pageIndex
  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: pageIdex')
    } else {
      pageIndex = parseInt(pageIndex)
      if (pageIndex < 1) {
        throw new Error('pageIndex should be > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  try {
    response = await userDynamicManager.queryAllDynamics(pageIndex)
  } catch (error) {
    response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, response.errorMsg)
  }

  return res.status(200).send(response)
}

/**
 * Querys friends' dynamics.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryFriendDynamics (req, res, next) {
  const funcName = 'server: controllers/dynamic/queryFriendDynamics'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.query))

  let response = { errorCode: errorCode.SUCCESS }
  let userId = req.query.userId
  let pageIndex = req.query.pageIndex
  // Validates parameters
  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: pageIndex')
    } else {
      userId = validator.trim(userId)
      pageIndex = parseInt(pageIndex)
      if (pageIndex < 1) {
        throw new Error('pageIndex should be > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return response
  }

  // If has no parameter errors
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await userDynamicManager.queryFriendDynamics(userId, pageIndex)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Querys one certain book's dynamics.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryDynamicsByISBN (req, res, next) {
  const funcName = 'server: controllers/dynamic/queryDynamicsByISBN'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.query))
  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameter errors.
  let isbn = req.query.isbn
  try {
    if (!isbn || (isbn && !validator.trim(isbn))) {
      throw new Error('Please provide parameter: isbn')
    } else {
      isbn = validator.trim(isbn)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  try {
    response = await userDynamicManager.queryDynamicsByISBN(isbn)
  } catch (error) {
    response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, response.errorMsg)
  }

  return res.status(200).send(response)
}

exports.getAllDynamics = getAllDynamics
exports.addDynamicInfo = addDynamicInfo
exports.queryDynamicsByISBN = queryDynamicsByISBN
exports.queryFriendDynamics = queryFriendDynamics
exports.updateDynamicLikeCount = updateDynamicLikeCount
exports.queryDynamicInfosByUserId = queryDynamicInfosByUserId
