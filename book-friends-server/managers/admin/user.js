const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const userInfoDal = require('../../dal/userDal')
const errorCode = require('../../error/errorCode')

/**
 * Querys all users
 */
async function queryAll (pageIndex, pageSize) {
  const funcName = 'server: managers/user/queryAll'
  let result = null

  try {
    const loadResults = await Promise.all([userInfoDal.queryAll(pageIndex, pageSize), userInfoDal.queryTotalCount()])
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
async function deleteUser (phoneNumber) {
  const funcName = 'server: managers/user/deleteUser'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.ERROR_CALL_MANAGER }

  if (phoneNumber) {
    try {
      const data = await userInfoDal.deleteOne(phoneNumber)
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

/**
 * Gets chart datas.
 */
async function getChartGroup () {
  const funcName = 'server: managers/user/getChartGroup'
  let result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }

  let loadResults = null
  try {
    loadResults = await Promise.all([userInfoDal.groupBySex(), userInfoDal.groupByProvince(), userInfoDal.groupByEducation()]).then()
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  if (loadResults && loadResults.length === 3) {
    const chartDatas = {
      sex: loadResults[0],
      province: loadResults[1],
      education: loadResults[2]
    }
    result = { errorCode: errorCode.SUCCESS, data: chartDatas }
  }

  return result
}

/**
 * Gets city chart data when in same province.
 * @param {*String} provinceName
 */
async function getCityChart (provinceName) {
  const funcName = 'server: managers/user/getCityChart'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.ERROR_CALL_MANAGER }

  if (provinceName) {
    try {
      const data = await userInfoDal.groupByCityInCertainProvince(provinceName)
      if (data) {
        result = { errorCode: errorCode.SUCCESS, data: data }
      } else {
        result = { erroCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
      }
    } catch (error) {
      result = { erroCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_DELETE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

/**
 * Gets users is onlined.
 */
async function queryOnlineUsers () {
  const funcName = 'server: managers/user/queryOnlineUsers'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.ERROR_CALL_MANAGER }

  try {
    const data = await userInfoDal.queryOnlineUsers()
    if (data) {
      result = { errorCode: errorCode.SUCCESS, data: data }
    } else {
      result = { erroCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
    }
  } catch (error) {
    result = { erroCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

exports.queryAll = queryAll
exports.deleteUser = deleteUser
exports.getCityChart = getCityChart
exports.getChartGroup = getChartGroup
exports.queryOnlineUsers = queryOnlineUsers
