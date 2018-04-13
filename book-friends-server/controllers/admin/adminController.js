const validator = require('validator')
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

  let adminName = req.body.adminName
  let password = req.body.password

  try {
    if (!adminName || (adminName && !validator.trim(adminName))) {
      throw new Error('Please provide parameter: admin name')
    } else if (!password || (password && !validator.trim(password))) {
      throw new Error('Please provide parameter: password')
    } else {
      adminName = validator.trim(adminName)
      password = validator.trim(password)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await adminManger.register(adminName, password)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + error.message }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

exports.register = register
