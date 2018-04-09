const validator = require('validator')
const errorCode = require('../../error/errorCode')
const loginManager = require('../../managers/admin/loginManger')

/**
 * Admin register account.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function register (req, res, next) {
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
    const result = await loginManager.register(adminName, password)
    response = result
  }

  return res.status(200).send(response)
}

exports.register = register
