const validator = require('validator')
const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const bookManager = require('../../managers/admin/book')

/**
 * Querys all books
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function queryAll (req, res, next) {
  const functionName = 'server: controllers/admin/book/queryAll'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.query))
  let responseResult = { errorCode: errorCode.SUCCESS }

  let pageIndex = req.query.pageIndex

  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: page index')
    } else {
      pageIndex = parseInt(pageIndex)
      if (pageIndex <= 0) {
        throw new Error('Please provide valid number parameter: page index > 0')
      }
    }
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(functionName, error.message)
    return res.status(200).send(responseResult)
  }

  try {
    responseResult = await bookManager.queryAll(pageIndex)
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  return res.status(200).send(responseResult)
}

/**
 * Updates one book.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function update (req, res, next) {
  const functionName = 'server: controllers/admin/book/update'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.body))
  let responseResult = { errorCode: errorCode.SUCCESS }

  let bookInfo = req.body

  try {
    if (!bookInfo) {
      throw new Error('Please provide parameter: bookInfo')
    } else {
      let isbn = bookInfo.isbn
      if (!isbn || (isbn && !validator.trim(isbn))) {
        throw new Error('Please provide parameter: isbn')
      } else {
        isbn = validator.trim(isbn)
      }
    }
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(functionName, error.message)
    return res.status(200).send(responseResult)
  }

  try {
    responseResult = await bookManager.update(bookInfo)
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  return res.status(200).send(responseResult)
}

/**
 * Deletes books.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function deleteBooks (req, res, next) {
  const functionName = 'server: controllers/admin/book/deleteBooks'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.body))
  let responseResult = { errorCode: errorCode.SUCCESS }

  let isbns = req.body.sibn

  try {
    if (!isbns || (isbns && !validator.trim(isbns))) {
      throw new Error('Please provide parameter: bookInfo')
    } else {
      isbns = JSON.parse(isbns)
    }
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(functionName, error.message)
    return res.status(200).send(responseResult)
  }

  try {
    responseResult = await bookManager.deleteBooks(isbns)
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  return res.status(200).send(responseResult)
}

exports.update = update
exports.queryAll = queryAll
exports.deleteBooks = deleteBooks
