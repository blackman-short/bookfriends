const validator = require('validator')
const types = require('../utils/types')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const bookProxy = require('../proxy/douban/bookInfoProxy')
const bookManager = require('../managers/bookInfoManager')

/**
 * Gets recommended books for user according to the user's hobbies
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getRecommendBooks (req, res, next) {
  const funcName = 'proxy: controller/book/getRecommendBooks'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }
  let hobbies = req.body.hobbies

  try {
    if (!hobbies || (hobbies && !validator.trim(hobbies))) {
      throw new Error('Please provide valid parameter: hobbies')
    } else {
      hobbies = JSON.parse(hobbies)
      if (!types.isArray(hobbies)) {
        throw new Error('Please provide valid parameter: (Array)hobbies')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await bookManager.queryRecommendBooks(hobbies)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + error.message }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Gets book info by book's isbn.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getBookInfoByISBN (req, res, next) {
  const funcName = 'proxy: controllers/book/getBookInfoByISBN'
  let response = { errorCode: errorCode.SUCCESS }
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))

  // Validates parameters.
  let isbn = req.body.isbn
  try {
    if (!isbn || (isbn && !validator.trim(isbn))) {
      throw new Error('Please provide parameter: isbn')
    } else {
      isbn = validator.trim(isbn)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG + error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    response = await bookProxy.getBookInfoByISBN(isbn)
  }

  return res.status(200).send(response)
}

exports.getBookInfoByISBN = getBookInfoByISBN
exports.getRecommendBooks = getRecommendBooks
