const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const commentDal = require('../dal/commentDal')
const userDynamicDal = require('../dal/userDynamicDal')

/**
 * Querys the certain dynamic's comments
 * @param {*String} dynamicId
 */
async function queryCommentsByDynamicId (dynamicId) {
  const funcName = 'server: managers/dynamic/queryCommentsByDynamicId'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (dynamicId) {
    let data = null

    try {
      data = await commentDal.queryCommentsByDynamicId(dynamicId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    // If save successfully.
    if (data) {
      result = { errorCode: errorCode.SUCCESS, data: data.comments }
    }
  }

  return result
}

/**
 * Comments one dynamic.
 * @param {*String} dynamicId
 * @param {*JSON} commentInfo
 */
async function addCommentOfDynamic (dynamicId, commentInfo) {
  const funcName = 'server: managers/dynamic/addCommentOfDynamic'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (dynamicId && commentInfo) {
    let find = null
    try {
      find = await userDynamicDal.queryDynamicInfoByDynamicId(dynamicId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    if (!find) {
      result = { errorCode: errorCode.ERROR_DYNAMIC_NOTEXISTED, errorMsg: errorMsg.ERROR_DYNAMIC_NOTEXISTED }
      logUtil.logDebugMsg(funcName, result.errorMsg + `dynamicId: ${dynamicId}`)
      return result
    }

    // If the dynamic is valid.
    let saveResult = null
    try {
      saveResult = await commentDal.addComment(dynamicId, commentInfo)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB }
      logUtil.logErrorMsg(funcName, result.errorMsg + JSON.stringify(error))
    }

    if (saveResult) {
      result = { errorCode: errorCode.SUCCESS }
    }
  }

  return result
}

exports.addCommentOfDynamic = addCommentOfDynamic
exports.queryCommentsByDynamicId = queryCommentsByDynamicId
