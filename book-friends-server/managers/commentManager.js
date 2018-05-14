const userDal = require('../dal/userDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const commentDal = require('../dal/commentDal')
const dynamicDal = require('../dal/userDynamicDal')
const userDynamicDal = require('../dal/userDynamicDal')

/**
 * Querys the certain dynamic's comments
 * @param {*String} dynamicId
 */
async function queryCommentsByDynamicId (dynamicId, pageIndex) {
  const funcName = 'server: managers/dynamic/queryCommentsByDynamicId'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (dynamicId) {
    let comments = null
    let find = null
    try {
      find = await dynamicDal.queryDynamicInfoByDynamicId(dynamicId)
      comments = await commentDal.queryCommentsByDynamicId(dynamicId, pageIndex)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    // Validates the dynamic is valid.
    if (!find) {
      result = { errorCode: errorCode.ERROR_DYNAMIC_NOTEXISTED, errorMsg: errorMsg.ERROR_DYNAMIC_NOTEXISTED }
      logUtil.logDebugMsg(funcName, result.errorMsg + `dynamicId: ${dynamicId}`)
      return result
    }

    // If save successfully.
    if (comments) {
      for (let i = 0; i < comments.length; i++) {
        let comment = comments[i]
        let userId = comment.userId
        let user = await userDal.queryUserInfoById(userId)
        if (!user) {
          user = {
            nickName: '匿名',
            headIcon: 'm_01'
          }
        }
        comment.nickName = user.nickName
        comment.headIcon = user.headIcon
      }
      result = { errorCode: errorCode.SUCCESS, data: comments }
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
    let user = null
    try {
      find = await userDynamicDal.queryDynamicInfoByDynamicId(dynamicId)
      user = await userDal.queryUserInfoById(commentInfo.userId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    if (!user) {
      result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
      logUtil.logDebugMsg(funcName, result.errorMsg + `userId: ${commentInfo.userId}`)
      return result
    } else if (!find) {
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

/**
 * Likes one comment.
 * @param {*String} commentId
 */
async function likeComment (commentId) {
  const funcName = 'server: managers/comment/likeComment'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (commentId) {
    let data = null
    try {
      data = await commentDal.likeComment(commentId)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_UPDATE_DB }
      logUtil.logErrorMsg(funcName, result.errorMsg + JSON.stringify(error))
    }

    // Updates successfully.
    if (data) {
      result = { errorCode: errorCode.SUCCESS }
    } else {
      result = { errorCode: errorCode.ERROR_COMMENT_NOTEXISTED, errorMsg: errorMsg.ERROR_COMMENT_NOTEXISTED }
    }
  }

  return result
}

exports.likeComment = likeComment
exports.addCommentOfDynamic = addCommentOfDynamic
exports.queryCommentsByDynamicId = queryCommentsByDynamicId
