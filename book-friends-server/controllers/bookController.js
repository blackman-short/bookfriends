const validator = require('validator')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const bookManager = require('../managers/bookManager')

/**
 * Mock data.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function saveBook (req, res, next) {
  let result = null

  try {
    result = await bookManager.saveBook()
  } catch (error) {
    result = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + error.message }
  }

  return res.status(200).send(result)
}

/**
 * Querys new books.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getNewBooks (req, res, next) {
  const funcName = 'server: controllers/book/getNewBooks'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }
  let keyWord = req.query.keyWord
  let pageIndex = req.query.pageIndex

  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: (number) pageIndex')
    } else if (!keyWord) {
      keyWord = ''
    } else {
      pageIndex = parseInt(pageIndex)
      if (pageIndex <= 0) {
        throw new Error('Please provide valida parameter: (number) pageIndex > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(funcName, response.errorMsg)
    return res.status(200).send(response)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      const loadResult = await bookManager.queryNewBooks(pageIndex, keyWord)
      response = loadResult
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_MANAGER + error.message }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Querys hot books.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getHotBooks (req, res, next) {
  const funcName = 'server: controllers/book/getHotBooks'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }
  let keyWord = req.query.keyWord
  let pageIndex = req.query.pageIndex

  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: (number) pageIndex')
    } else if (!keyWord) {
      keyWord = ''
    } else {
      pageIndex = parseInt(pageIndex)
      if (pageIndex <= 0) {
        throw new Error('Please provide valida parameter: (number) pageIndex > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(funcName, error.message)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await bookManager.queryHotBooks(pageIndex, keyWord)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_MANAGER + error.message }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

/**
 * Querys recommend books.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getRecommendBooks (req, res, next) {
  const funcName = 'server: controllers/book/getRecommendBooks'
  logUtil.logDebugMsg(funcName, JSON.stringify(req.body))
  let response = { errorCode: errorCode.SUCCESS }
  let userId = req.query.userId
  let pageIndex = req.query.pageIndex

  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: user ID')
    } else if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: page index')
    } else {
      userId = validator.trim(userId)
      pageIndex = parseInt(pageIndex)
      if (pageIndex <= 0) {
        throw new Error('Please provide valid number parameter: page index > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(funcName, error.message)
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      response = await bookManager.queryRecommendBooks(pageIndex, userId)
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + error.message }
      logUtil.logErrorMsg(funcName, response.errorMsg)
    }
  }

  return res.status(200).send(response)
}

exports.saveBook = saveBook
exports.getNewBooks = getNewBooks
exports.getHotBooks = getHotBooks
exports.getRecommendBooks = getRecommendBooks
