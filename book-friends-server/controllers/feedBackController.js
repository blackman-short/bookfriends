const validator = require('validator')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const feedbackManager = require('../managers/feedBackManager')

/**
 * User publishes one feedback.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function publish (req, res, next) {
  const funcName = 'server: contrllers/feedback/publish'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))

  let response = { errorCode: errorCode.SUCCESS }

  // Validates parameters.
  let userId = req.body.userId
  let content = req.body.content
  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!content || (content && !validator.trim(content))) {
      throw new Error('Please privide parameter: content')
    } else {
      userId = validator.trim(userId)
      content = validator.trim(content)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await feedbackManager.publish(userId, content)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }
  return res.status(200).send(response)
}

exports.publish = publish
