const validator = require('validator')
const tools = require('../utils/tools')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userInfoManager = require('../managers/userInfo')

/**
 * Register.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function register (req, res, next) {
  let responseResult = { errorCode: errorCode.SUCCESS }
  // Should be secret parameter from app.
  let phoneNumber = req.body.phoneNumber
  let password = req.body.password

  // validates parameters.
  try {
    if (!phoneNumber || (phoneNumber && !validator.trim(phoneNumber))) {
      throw new Error('Please provide parameter: phone number')
    } else if (!password || (password && !validator.trim(password))) {
      throw new Error('Please provide parameter: password')
    } else if (!tools.isPhoneNumber(phoneNumber)) {
      throw new Error('the phone number is invalid')
    } else {
      phoneNumber = validator.trim(phoneNumber)
      password = validator.trim(password)
    }
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  // If has no parameter error.
  if (responseResult.errorCode === errorCode.SUCCESS) {
    try {
      responseResult = await userInfoManager.register(phoneNumber, password)
    } catch (error) {
      responseResult = { errorCode: errorCode.ERROR_REGISTER, errorMsg: '[controller/register]Fails to register' }
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
  let responseResult = { errorCode: errorCode.SUCCESS }
  let phoneNumber = req.body.phoneNumber
  let password = req.body.password

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
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  }

  if (responseResult.errorCode === errorCode.SUCCESS) {
    try {
      responseResult = await userInfoManager.login(phoneNumber, password)
    } catch (error) {
      responseResult = { errorCode: errorCode.ERROR_LOGIN, errorMsg: '[controller/login]Fails to login' }
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
  let responseResult = { errorCode: errorCode.SUCCESS }
  let userInfo = req.body.userInfo
  if (userInfo) {
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
        responseResult = { errorCode: errorCode.ERROR_UPDATE_USERINFO, errorMsg: '[controller/update]Fails to update user information' }
      }
    }
  }

  return res.status(200).send(responseResult)
}

exports.register = register
exports.login = login
exports.updateInfo = updateInfo
