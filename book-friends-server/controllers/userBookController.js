const validator = require('validator')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const bookManager = require('../managers/bookManager')

/**
 * User stores up one book.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function storeUpBook (req, res, next) {
  const funcName = 'server: controllers/book/storeUpBook'
  let response = { errorCode: errorCode.SUCCESS }

  let userId = req.body.userId
  let isbn = req.body.isbn
  // Validates parameter.
  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: userId')
    } else if (!isbn || (isbn && !validator.trim(isbn))) {
      throw new Error('Please provide parameter: isbn')
    } else {
      userId = validator.trim(userId)
      isbn = validator.trim(isbn)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter error.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await bookManager.storeUpBook(userId, isbn)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

exports.storeUpBook = storeUpBook
