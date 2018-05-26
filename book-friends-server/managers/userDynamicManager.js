// const validator = require('validator')
const userDal = require('../dal/userDal')
const bookDal = require('../dal/bookDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const commentDal = require('../dal/commentDal')
const userFriendDal = require('../dal/userFriendsDal')
const userDynamicDal = require('../dal/userDynamicDal')

/**
 * Adds one new dynamic.
 * @param {String} userId
 * @param {String} content
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
 * @param {String} dynamicId
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
 * @param {String} userId
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
 * @param {String} dynamicId
 */
async function queryDynamicInfoById (dynamicId) {
  let dynamicInfo = null
  const funcName = 'server: managers/dynamic/queryDynamicInfoById'
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
        // 该条动态的用户
        const userId = data.userId

        let loadResults = null
        if (userId) {
          loadResults = await Promise.all([bookDal.queryCertainFieldsByISBN(isbn), userDal.queryUserCertainFieldsById(userId)]).then()
        }

        if (loadResults && loadResults.length === 2) {
          const bookInfo = loadResults[0]
          const userInfo = loadResults[1]
          if (bookInfo) {
            dynamicInfo.book = bookInfo
          }
          if (userInfo) {
            dynamicInfo.user = userInfo
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

/**
 * Querys all dynamics
 */
async function queryAllDynamics (pageIndex) {
  const funcName = 'server: managers/dynamic/queryAllDynamics'
  let result = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER }

  let dynamics = []
  try {
    const infos = await userDynamicDal.queryAllDynamicInfos(pageIndex)
    if (infos && infos.length > 0) {
      for (let i = 0; i < infos.length; i++) {
        const dynamicId = infos[i].id
        const d = await queryDynamicInfoById(dynamicId)
        if (d) {
          dynamics.push(d)
        }
      }
    }

    result = { errorCode: errorCode.SUCCESS, data: dynamics }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

/**
 * Querys friends' dynamics.
 * @param {String} userId
 * @param {String} pageIndex
 */
async function queryFriendDynamics (userId, pageIndex) {
  const funcName = 'server: managers/dynamic/queryFriendDynamics'
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
      const friendIds = await userFriendDal.queryFriendIdsByUserId(userId)
      if (!friendIds || (friendIds && friendIds.length === 0)) {
        result = { errorCode: errorCode.SUCCESS, data: [] }
        return result
      }
      idInfos = await userDynamicDal.queryDynamicIdsByUserIds(friendIds, pageIndex)
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
 * Querys one certain book's comment.
 * @param {String} isbn
 */
async function queryDynamicsByISBN (isbn) {
  const funcName = 'server: managers/dynamic/queryDynamicsByISBN'
  let result = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER }

  let dynamics = []
  try {
    const infos = await userDynamicDal.queryDynamicsByISBN(isbn)
    if (infos && infos.length > 0) {
      for (let i = 0; i < infos.length; i++) {
        const dynamicId = infos[i].id
        const loadResult = await queryDynamicInfoById(dynamicId)
        if (loadResult.errorCode === errorCode.SUCCESS) {
          dynamics.push(loadResult.data)
        }
      }
    }

    result = { errorCode: errorCode.SUCCESS, data: dynamics }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

/**
 * Querys today's dynamics.
 */
async function queryTodayDynamics () {
  const funcName = 'server: managers/dynamic/queryTodayDynamics'
  let result = { errroCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  let dynamicInfos = []

  try {
    const data = await userDynamicDal.queryTodayDynamics()
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let dynamic = {
          createTime: data[i].createTime
        }
        const userId = data[i].userId
        const isbn = data[i].isbn
        // Gets the user's info.
        if (userId) {
          const user = await userDal.queryUserInfoById(userId)
          if (user) {
            dynamic.userName = user.nickName
          }
        }

        // Gets the book's info.
        if (isbn) {
          const book = await bookDal.queryBookByISBN(isbn)
          if (book) {
            dynamic.bookName = book.title
          }
        }

        dynamicInfos.push(dynamic)
      }
    }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  result = { errorCode: errorCode.SUCCESS, data: dynamicInfos }

  return result
}

exports.addDynamicInfo = addDynamicInfo
exports.queryAllDynamics = queryAllDynamics
exports.queryTodayDynamics = queryTodayDynamics
exports.queryDynamicsByISBN = queryDynamicsByISBN
exports.queryFriendDynamics = queryFriendDynamics
exports.updateDynamicLikeCount = updateDynamicLikeCount
exports.queryDynamicInfosByUserId = queryDynamicInfosByUserId
