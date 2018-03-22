const userInfoDal = require('../dal/userInfo')
const errorCode = require('../error/errorCode')
const errorMsg = require('../error/errorMsg')

/**
 * Registers a new account.
 * @param {*String} phoneNumber
 * @param {*String} password
 */
async function register (phoneNumber, password) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (phoneNumber && password) {
    try {
      result = await userInfoDal.register(phoneNumber, password)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_REGISTER, errorMsg: errorMsg.ERROR_REGISTER }
    }
  }

  return result
}

/**
 * Login.
 * @param {*String} phoneNumber
 * @param {*String} password
 */
async function login (phoneNumber, password) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  let loginResult = null
  if (phoneNumber && password) {
    try {
      loginResult = await userInfoDal.login(phoneNumber, password)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_LOGIN, errorMsg: errorMsg.ERROR_LOGIN }
    }

    if (loginResult.errorCode === errorCode.SUCCESS) {
      result = { errorCode: errorCode.SUCCESS }
    } else {
      result = loginResult
    }
  }

  return result
}

/**
 * Updates the user's personnal information.
 * @param {*Object} userInfo
 */
async function updateInfo (userInfo) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userInfo) {
    try {
      result = await userInfoDal.updateInfo(userInfo)
    } catch (error) {
      result = { errorCode: errorCode.ERROR_UPDATE_USERINFO, errorMsg: errorMsg.ERROR_UPDATE_USERINFO }
    }
  }

  return result
}

exports.register = register
exports.login = login
exports.updateInfo = updateInfo
