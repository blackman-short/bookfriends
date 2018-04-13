const validator = require('validator')
const tools = require('../utils/tools')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userInfoManager = require('../managers/userManager')

/**
 * Register.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function register (req, res, next) {
  const functionName = 'server: controllers/user/register'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.body))
  let responseResult = { errorCode: errorCode.SUCCESS }
  // Should be secret parameter from app.
  let phoneNumber = req.body.phoneNumber
  let password = req.body.password
  let nickName = req.body.nickName

  // validates parameters.
  try {
    if (!phoneNumber || (phoneNumber && !validator.trim(phoneNumber))) {
      throw new Error('Please provide parameter: phone number')
    } else if (!password || (password && !validator.trim(password))) {
      throw new Error('Please provide parameter: password')
    } else if (!tools.isPhoneNumber(phoneNumber)) {
      throw new Error('the phone number is invalid')
    } else if (!nickName || (nickName && !validator.trim(nickName))) {
      throw new Error('Please provide parameter: nick name')
    } else {
      phoneNumber = validator.trim(phoneNumber)
      password = validator.trim(password)
      nickName = validator.trim(nickName)
    }
  } catch (error) {
    logUtil.logErrorMsg()
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  // If has no parameter error.
  if (responseResult.errorCode === errorCode.SUCCESS) {
    try {
      responseResult = await userInfoManager.register(phoneNumber, password, nickName)
    } catch (error) {
      responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + error.message }
      logUtil.logErrorMsg(functionName, responseResult.errorMsg)
    }
  }

  return res.status(200).send(responseResult)
}

/**
 * Login.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function login (req, res, next) {
  const functionName = 'server: controllers/user/login'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.body))
  let responseResult = { errorCode: errorCode.SUCCESS }
  let phoneNumber = req.body.phoneNumber
  let password = req.body.password

  // Validates request params.
  try {
    if (!phoneNumber || (phoneNumber && !validator.trim(phoneNumber))) {
      throw new Error('Please provide parameter: phone number')
    } else if (!password || (password && !validator.trim(phoneNumber))) {
      throw new Error('Please provide parameter: password')
    } else if (!tools.isPhoneNumber(phoneNumber)) {
      throw new Error('the phone number is invalid')
    } else {
      phoneNumber = validator.trim(phoneNumber)
      password = validator.trim(password)
    }
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  // If has no parameter errors.
  if (responseResult.errorCode === errorCode.SUCCESS) {
    try {
      responseResult = await userInfoManager.login(phoneNumber, password)
    } catch (error) {
      responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + error.message }
      logUtil.logErrorMsg(functionName, responseResult.errorMsg)
    }
  }

  return res.status(200).send(responseResult)
}

/**
 * Updates user's personnal information.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function updateInfo (req, res, next) {
  const functionName = 'server: controllers/user/update'
  logUtil.logDebugMsg(functionName, JSON.stringify(req.body))
  let responseResult = { errorCode: errorCode.SUCCESS }
  let userInfo = req.body.userInfo
  // If user info is null.
  if (!userInfo) {
    logUtil.logDebugMsg(functionName, 'the update info is null')
    return res.status(200).send({errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + 'update info is null'})
  }

  // test the birthday is valid pattern. For example: '1995-12-19'.
  if (userInfo.birthday) {
    if (!tools.isValidDate(userInfo.birthday)) {
      responseResult = { errorCode: errorCode.PARAMETER_ERRORMSG, errorMsg: errorMsg.INVALID_DATEPATTERN }
    } else {
      userInfo.birthday = validator.trim(userInfo.birthday)
      userInfo.updateTime = tools.getCurrentTime()
    }
  }

  // If has no parameter error.
  if (responseResult.errorCode === errorCode.SUCCESS) {
    try {
      responseResult = await userInfoManager.updateInfo(userInfo)
    } catch (error) {
      responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + error.message }
      logUtil.logErrorMsg(functionName, responseResult.errorMsg)
    }
  }

  return res.status(200).send(responseResult)
}

exports.register = register
exports.login = login
exports.updateInfo = updateInfo
