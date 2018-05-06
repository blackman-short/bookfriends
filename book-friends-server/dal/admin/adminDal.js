const tools = require('../../utils/tools')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const AdminInfo = require('../../models').AdminInfo
const PAGE_SIZE = require('../../config/systemConfig').pageSize

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
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (phoneNumber && password) {
    const admin = await AdminInfo.findOne({ phoneNumber: phoneNumber, password: password }, '-__v -password')
    const account = await AdminInfo.findOne({phoneNumber: phoneNumber})
    // If success, return the user's information
    if (admin) {
      result = { errorCode: errorCode.SUCCESS, data: admin } // login successfully.
      // async update the user's lastLoginTime.
      await AdminInfo.update({phoneNumber: admin.phoneNumber}, {loginAt: tools.getCurrentTime()})
    } else {
      if (!account) {
        result = { errorCode: errorCode.ERROR_USER_NOTEXISTED } // account is not existed.
      } else {
        result = { errorCode: errorCode.ERROR_PWD } // password is wrong.
      }
    }
  }

  return result
}

/**
 * Updates admin info.
 * @param {*JSON} adminInfo
 */
async function update (adminInfo) {
  let result = null

  if (adminInfo && adminInfo.phoneNumber) {
    const find = await AdminInfo.findOne({phoneNumber: adminInfo.phoneNumber})
    if (!find) {
      result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED }
    } else {
      const data = await AdminInfo.update({phoneNumber: adminInfo.phoneNumber}, adminInfo)
      if (data) {
        result = { errorCode: errorCode.SUCCESS }
      }
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
  let admins = null

  if (!pageSize) {
    pageSize = PAGE_SIZE
  }

  if (pageIndex) {
    const skipCount = (pageIndex - 1) * pageSize
    admins = await AdminInfo.find({}).skip(skipCount).limit(pageSize)
  }

  return admins
}

/**
 * Gets admin's total count.
 */
async function getTotalCount () {
  let count = 0

  count = await AdminInfo.find({}).count()

  return count
}

exports.login = login
exports.update = update
exports.queryAll = queryAll
exports.register = register
exports.getTotalCount = getTotalCount
