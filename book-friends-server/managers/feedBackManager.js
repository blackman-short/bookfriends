const userDal = require('../dal/userDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const feedBackDal = require('../dal/feedBackDal')

/**
 * User published one feedback.
 * @param {String} userId
 * @param {String} content
 */
async function publish (userId, content) {
  const funcName = 'server: managers/feedback/publish'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (userId && content) {
    try {
      // Validates the user is valid.
      const user = await userDal.queryUserInfoById(userId)
      if (!user) {
        result = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED + `userId: ${userId}` }
        logUtil.logDebugMsg(funcName, result.errorMsg)
        return result
      }

      const save = await feedBackDal.save(userId, content)
      if (save) {
        result = { errorCode: errorCode.SUCCESS }
      } else {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: `feedback: ${errorMsg.ERROR_INSERT_DB}` }
        logUtil.logDebugMsg(funcName, result.errorMsg)
      }
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

exports.publish = publish
