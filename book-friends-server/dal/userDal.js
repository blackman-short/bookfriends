const tools = require('../utils/tools')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const UserInfo = require('../models').UserInfo
const errorCode = require('../error/errorCode')
const PAGE_SIZE = require('../config/systemConfig').pageSize

/**
 * Registers a new account.
 * @param {*String} phoneNumber
 * @param {*String} password
 */
async function register (phoneNumber, password, nickName) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (phoneNumber && password && nickName) {
    // Finds the user by phoneNumber.
    const user = await UserInfo.findOne({ phoneNumber: phoneNumber })
    // If has not existed.
    if (!user || (user && user.length === 0)) {
      const userInfo = new UserInfo({
        phoneNumber: phoneNumber,
        password: password,
        nickName: nickName
      })
      // creates one account.
      await userInfo.save()
      result = { errorCode: errorCode.SUCCESS }
    } else {
      // If has existed.
      result = { errorCode: errorCode.ERROR_USER_HASEXISTED, errorMsg: errorMsg.USER_HASEXISTED }
      // resets the isActive to 'true'
      await UserInfo.update({phoneNumber: phoneNumber}, {isActive: true})
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

  // If the parameters is valid.
  if (phoneNumber && password) {
    const user = await UserInfo.findOne({ phoneNumber: phoneNumber, password: password, isActive: true }, '-__v -_id')
    const account = await UserInfo.findOne({phoneNumber: phoneNumber})
    const pwd = await UserInfo.findOne({phoneNumber: phoneNumber, password: password})
    // If success, return the user's information
    if (user) {
      result = { errorCode: errorCode.SUCCESS, data: user } // login successfully.
      // async update the user's lastLoginTime.
      await UserInfo.update({phoneNumber: user.phoneNumber}, {lastLoginTime: tools.getCurrentTime()})
    } else {
      if (!account) {
        result = { errorCode: errorCode.ERROR_USER_NOTEXISTED } // account is not existed.
      } else {
        if (pwd) {
          result = { errorCode: errorCode.ERROR_ACCOUNT } // account is not active. - 黑名单
        } else {
          result = { errorCode: errorCode.ERROR_PWD } // password is wrong.
        }
      }
    }
  }

  return result
}

/**
 * Updates user's personnal information.
 * @param {*Object} userInfo
 */
async function updateInfo (userInfo) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  // If the parameters is valid.
  if (userInfo) {
    const user = await UserInfo.find({ phoneNumber: userInfo.phoneNumber, isActive: true })
    // If success, return the user's information
    if (user && user.length > 0) {
      await UserInfo.update(userInfo)
      result = { errorCode: errorCode.SUCCESS }
    } else {
      result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.ERROR_USER_NOTEXISTED }
      logUtil.logInfoMsg('server: dal/user/update', 'the user is not exited')
    }
  }

  return result
}

/**
 * Querys user info according to user ID.
 * @param {*String} userId
 */
async function queryUserInfoById (userId) {
  let data = null

  if (userId) {
    data = await UserInfo.findOne({ id: userId, isActive: true }, '-_id -__v -createTime -updateTime')
  }

  return data
}

/**
 * Querys user's ceratin fields by userId.
 * @param {*String} userId
 */
async function queryUserCertainFieldsById (userId) {
  let data = null

  if (userId) {
    data = await UserInfo.findOne({ id: userId, isActive: true }, '-_id -__v -createTime -updateTime')
  }

  return data
}

/**
 * Searched users by keyword.
 * @param {*String} keyWord
 * @param {*Number} pageIndex
 */
async function searchUsersByKeyword (keyWord, pageIndex) {
  let users = null

  if (keyWord && pageIndex > 0) {
    const regEx = new RegExp(keyWord, 'i')
    const skipCount = (pageIndex - 1) * PAGE_SIZE
    users = await UserInfo.find({$or: [{nickName: regEx}, {phoneNumber: regEx}], isActive: true}, '-_id -__v')
      .skip(skipCount).limit(PAGE_SIZE)
  }

  return users
}

exports.login = login
exports.register = register
exports.updateInfo = updateInfo
exports.queryUserInfoById = queryUserInfoById
exports.queryUserCertainFieldsById = queryUserCertainFieldsById
exports.searchUsersByKeyword = searchUsersByKeyword
