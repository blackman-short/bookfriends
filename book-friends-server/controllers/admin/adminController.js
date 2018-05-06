const validator = require('validator')
const tools = require('../../utils/tools')
const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const adminManger = require('../../managers/admin/adminManager')

/**
 * Admin register account.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function register (req, res, next) {
  const funcName = 'server: controllers/admin/register'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  let realName = req.body.realName
  let adminName = req.body.adminName
  let password = req.body.password
  let phoneNumber = req.body.phoneNumber
  let email = req.body.email

  try {
    if (!realName || (realName && !validator.trim(realName))) {
      throw new Error('Please provide parameter: realName')
    } else if (!adminName || (adminName && !validator.trim(adminName))) {
      throw new Error('Please provide parameter: admin name')
    } else if (!password || (password && !validator.trim(password))) {
      throw new Error('Please provide parameter: password')
    } else if (!phoneNumber || (phoneNumber && !validator.trim(phoneNumber))) {
      throw new Error('Please provide parameter: phoneNumber')
    } else if (!email || (email && !validator.trim(email))) {
      throw new Error('Please provide parameter: email')
    } else {
      realName = validator.trim(realName)
      adminName = validator.trim(adminName)
      password = validator.trim(password)
      phoneNumber = validator.trim(phoneNumber)
      email = validator.trim(email)

      if (!tools.isEmail(email)) {
        throw new Error('email is valid format')
      } else if (!tools.isPhoneNumber(phoneNumber)) {
        throw new Error('phoneNumberk is valid format')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await adminManger.register(realName, adminName, password, phoneNumber, email)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Login.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function login (req, res, next) {
  const funcName = 'server: controllers/admin/login'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  let password = req.body.password
  let phoneNumber = req.body.phoneNumber

  try {
    if (!phoneNumber || (phoneNumber && !validator.trim(phoneNumber))) {
      throw new Error('Please provide parameter: phoneNumber')
    } else if (!password || (password && !validator.trim(password))) {
      throw new Error('Please provide parameter: password')
    } else {
      phoneNumber = validator.trim(phoneNumber)
      password = validator.trim(password)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await adminManger.login(phoneNumber, password)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Updates admin info.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update (req, res, next) {
  const funcName = 'server: controllers/admin/update'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }

  let adminInfo = req.body

  try {
    if (!adminInfo) {
      throw new Error('Please provide admin info')
    } else {
      const phoneNumber = adminInfo.phoneNumber
      if (!phoneNumber || (phoneNumber && !validator.trim(phoneNumber))) {
        throw new Error('Please provide parameter: phoneNumber')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await adminManger.update(adminInfo)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Querys all admins
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryAll (req, res, next) {
  const funcName = 'server: controllers/admin/queryAll'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.query))
  let response = { errorCode: errorCode.SUCCESS }

  let pageIndex = req.query.pageIndex
  let pageSize = req.query.pageSize

  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: pageIndex')
    } else if (!pageSize || (pageIndex && !validator.trim(pageSize))) {
      throw new Error('Please provide parameter: pageSize')
    } else {
      pageIndex = parseInt(pageIndex)
      pageSize = parseInt(pageSize)

      if (pageIndex < 1) {
        throw new Error('pageIndex should be > 0')
      } else if (pageSize < 1) {
        throw new Error('pageSize should be > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await adminManger.queryAll(pageIndex, pageSize)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

exports.login = login
exports.update = update
exports.queryAll = queryAll
exports.register = register
