const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const AdminInfo = require('../../models').AdminInfo

/**
 * Admin registers account.
 * @param {*String} adminName
 * @param {*String} password
 */
async function register (realName, adminName, password, phoneNumber, email) {
  let resultData = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (adminName && password && realName && phoneNumber && email) {
    const find = await AdminInfo.findOne({phoneNumber: phoneNumber})
    if (!find) {
      const admin = new AdminInfo({
        realName: realName,
        adminName: adminName,
        password: password,
        phoneNumber: phoneNumber,
        email: email
      })
      resultData = await admin.save()
    } else {
      resultData = { errorCode: errorCode.ERROR_USER_HASEXISTED, errorMsg: errorMsg.USER_HASEXISTED }
    }
  }

  return resultData
}

/**
 *
 * @param {*String} phoneNumber
 * @param {*String} password
 */
async function login (phoneNumber, password) {
  let data = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (phoneNumber && password) {
    data = await AdminInfo.findOne({phoneNumber: phoneNumber, password: password})
  }

  return data
}

exports.login = login
exports.register = register
