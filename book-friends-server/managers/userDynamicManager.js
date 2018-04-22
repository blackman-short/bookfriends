const validator = require('validator')
const userDal = require('../dal/userDal')
const bookDal = require('../dal/bookDal')
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
async function addDynamicInfo (userId, content, isbn) {
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
      content: content,
      isbn: isbn
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
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_UPDATE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
      return result
    }

    // If save successfully.
    if (updateResult) {
      result = { errorCode: errorCode.SUCCESS }
    } else {
      result = { errorCode: errorCode.ERROR_DYNAMIC_NOTEXISTED, errorMsg: errorMsg.ERROR_DYNAMIC_NOTEXISTED }
      logUtil.logDebugMsg(funcName, result.errorMsg + `dynamicId: ${dynamicId}`)
    }
  }

  return result
}

/**
 * Querys the certain user's dynamics.
 * @param {*String} userId
 */
async function queryDynamicInfosByUserId (userId, pageIndex) {
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
      idInfos = await userDynamicDal.queryDynamicIdsByUserId(userId, pageIndex)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }

    if (idInfos && idInfos.length > 0) {
      for (let i = 0; i < idInfos.length; i++) {
        const loadResult = await queryDynamicInfoById(idInfos[i].id)
        if (loadResult.errorCode === errorCode.SUCCESS) {
          dynamicInfos.push(loadResult.data)
        }
      }
    }

    result = { errorCode: errorCode.SUCCESS, data: dynamicInfos }
  }

  return result
}

/**
 * Querys the certain dynamic's info.
 * @param {*String} dynamicId
 */
async function queryDynamicInfoById (dynamicId) {
  let dynamicInfo = null
  const funcName = 'server: managers/dynamic/queryCommentsByDynamicId'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  if (dynamicId) {
    let data = null

    try {
      data = await userDynamicDal.queryDynamicInfoByDynamicId(dynamicId)
      if (data) {
        dynamicInfo = {
          id: data.id,
          content: data.content,
          likeCount: data.likeCount,
          createTime: data.createTime
        }
        const commentCount = await commentDal.queryCommentCountByDynamicId(dynamicId)
        dynamicInfo.commentCount = commentCount

        // 动态相关的书籍
        const isbn = data.isbn
        if (isbn && validator.trim(isbn)) {
          const bookInfo = await bookDal.queryCertainFieldsByISBN(data.isbn)
          if (bookInfo) {
            dynamicInfo.book = bookInfo
          }
        }

        result = { errorCode: errorCode.SUCCESS, data: dynamicInfo }
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
