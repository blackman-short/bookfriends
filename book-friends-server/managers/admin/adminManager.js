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
    const data = await adminDal.register(realName, adminName, password, phoneNumber, email)
    if (data) {
      result = { errorCode: errorCode.SUCCESS, data: data }
    }
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

exports.login = login
exports.register = register
