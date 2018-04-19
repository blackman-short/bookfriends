const userDal = require('../dal/userDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const commentDal = require('../dal/commentDal')
const userDynamicDal = require('../dal/userDynamicDal')

/**
 * Adds one new dynamic.
 * @param {*String} userId
 * @param {*String} content
 */
async function addDynamicInfo (userId, content) {
  const funcName = 'server: managers/dynamic/addDynamicInfo'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userId && content) {
    // Validates user is valid.
    let user = null
    try {
      user = await userDal.queryUserInfoById(userId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    if (!user) {
      result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
      logUtil.logDebugMsg(funcName, result.errorMsg + `userId: ${userId}`)
      return result
    }

    const dynamicInfo = {
      userId: userId,
      content: content
    }
    let saveResult = null
    try {
      saveResult = await userDynamicDal.addDynamicInfo(dynamicInfo)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    // If save successfully.
    if (saveResult) {
      result = { errorCode: errorCode.SUCCESS }
    }
  }

  return result
}

/**
 * Likes the certain dynamic.
 * @param {*String} dynamicId
 */
async function updateDynamicLikeCount (dynamicId) {
  const funcName = 'server: managers/dynamic/updateDynamicLikeCount'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (dynamicId) {
    let updateResult = null

    try {
      updateResult = await userDynamicDal.updateDynamicLikeCount(dynamicId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    // If save successfully.
    if (updateResult) {
      result = { errorCode: errorCode.SUCCESS }
    }
  }

  return result
}

/**
 * Querys the certain user's dynamics.
 * @param {*String} userId
 */
async function queryDynamicInfosByUserId (userId) {
  const funcName = 'server: managers/dynamic/queryDynamicInfosByUserId'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  let dynamicInfos = []
  if (userId) {
    // Validates user is valid.
    let user = null
    try {
      user = await userDal.queryUserInfoById(userId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    if (!user) {
      result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
      logUtil.logDebugMsg(funcName, result.errorMsg + `userId: ${userId}`)
      return result
    }

    let idInfos = null
    try {
      idInfos = await userDynamicDal.queryDynamicIdsByUserId(userId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }

    if (idInfos && idInfos.length > 0) {
      for (let i = 0; i < idInfos.length; i++) {
        const dInfo = await queryDynamicInfoById(idInfos[i].id)
        if (dInfo) {
          dynamicInfos.push(dInfo)
        }
      }
      result = { errorCode: errorCode.SUCCESS, data: dynamicInfos }
    }
  }

  return result
}

/**
 * Querys the certain dynamic's info.
 * @param {*String} dynamicId
 */
async function queryDynamicInfoById (dynamicId) {
  const funcName = 'server: managers/dynamic/queryCommentsByDynamicId'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  if (dynamicId) {
    let data = null

    try {
      data = await userDynamicDal.queryDynamicInfoByDynamicId(dynamicId)
      if (data && data.id) {
        const commentCount = await commentDal.queryCommentCountByDynamicId(dynamicId)
        data.commentCount = commentCount
      }
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }
  }

  return result
}

exports.addDynamicInfo = addDynamicInfo
exports.updateDynamicLikeCount = updateDynamicLikeCount
exports.queryDynamicInfosByUserId = queryDynamicInfosByUserId
