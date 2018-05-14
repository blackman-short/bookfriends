const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const adminDal = require('../../dal/admin/adminDal')

/**
 * Admin registers account.
 * @param {*String} adminName
 * @param {*String} password
 */
async function register (realName, adminName, password, phoneNumber, email) {
  const funcName = 'server: controllers/admin/register'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  try {
    result = await adminDal.register(realName, adminName, password, phoneNumber, email)
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

/**
 * Login.
 * @param {*String} phoneNumber
 * @param {*String} password
 */
async function login (phoneNumber, password) {
  const funcName = 'server: controllers/admin/login'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (phoneNumber && password) {
    try {
      const data = await adminDal.login(phoneNumber, password)
      if (data) {
        result = { errorCode: errorCode.SUCCESS, data: data }
      }
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

/**
 * Updates admin info.
 * @param {*JSON} adminInfo
 */
async function update (adminInfo) {
  const funcName = 'server: controllers/admin/update'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (adminInfo) {
    try {
      result = await adminDal.update(adminInfo)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_UPDATE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

/**
 * Querys all admins.
 * @param {*Number} pageIndex
 * @param {*Number} pageSize
 */
async function queryAll (pageIndex, pageSize) {
  const funcName = 'server: controllers/admin/queryAll'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (pageIndex) {
    try {
      const loadResults = await Promise.all([adminDal.queryAll(pageIndex, pageSize), adminDal.getTotalCount()]).then()

      if (loadResults && loadResults.length === 2) {
        const data = {
          admins: loadResults[0],
          totalCount: loadResults[1]
        }
        result = { errorCode: errorCode.SUCCESS, data: data }
      } else {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
      }
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }
  return result
}

async function deleteOne (id) {
  const funcName = 'server: controllers/admin/delete'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (id) {
    try {
      result = await adminDal.deleteOne(id)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_UPDATE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

exports.login = login
exports.update = update
exports.deleteOne = deleteOne
exports.queryAll = queryAll
exports.register = register
