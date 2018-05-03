const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const userInfoDal = require('../../dal/userDal')
const errorCode = require('../../error/errorCode')

/**
 * Querys all users
 */
async function queryAll (pageIndex) {
  const funcName = 'server: managers/user/queryAll'
  let result = null

  try {
    const loadResults = await Promise.all([userInfoDal.queryAll(pageIndex), userInfoDal.queryTotalCount()])
    if (loadResults && loadResults.length === 2) {
      const data = {
        users: loadResults[0],
        totalCount: loadResults[1]
      }
      result = { errorCode: errorCode.SUCCESS, data: data }
    } else {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
    }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

/**
 * Deletes one user by userId.
 * @param {*String} userId
 */
async function deleteUser (userId) {
  const funcName = 'server: managers/user/deleteUser'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.ERROR_CALL_MANAGER }

  if (userId) {
    try {
      const data = await userInfoDal.deleteOne(userId)
      if (data) {
        result = { errorCode: errorCode.SUCCESS }
      } else {
        result = { erroCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_DELETE_DB }
      }
    } catch (error) {
      result = { erroCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_DELETE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

exports.queryAll = queryAll
exports.deleteUser = deleteUser
