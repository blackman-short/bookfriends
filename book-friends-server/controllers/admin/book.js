const validator = require('validator')
const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const bookManager = require('../../managers/admin/book')
const userBookManager = require('../../managers/userBookManager')
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
  let pageSize = req.query.pageSize

  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: pageIndex')
    } else if (!pageSize || (pageSize && !validator.trim(pageSize))) {
      throw new Error('Please provide parameter: pageSize')
    } else {
      pageIndex = parseInt(pageIndex)
      pageSize = parseInt(pageSize)
      if (pageIndex <= 0) {
        throw new Error('Please provide valid number parameter: pageIndex > 0')
      } else if (pageSize <= 0) {
        throw new Error('Please provide valid number parameter: pageSize > 0')
      }
    }
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
    logUtil.logErrorMsg(functionName, error.message)
    return res.status(200).send(responseResult)
  }

  try {
    responseResult = await bookManager.queryAll(pageIndex, pageSize)
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

      if (bookInfo.tags) {
        bookInfo.tags = JSON.parse(bookInfo.tags)
      }
      if (bookInfo.images) {
        bookInfo.images = JSON.parse(bookInfo.images)
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

  let isbns = req.body.isbns

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

/**
 * Gets TOP 3 according to the count of visiting.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getTop3ByVisitCount (req, res, next) {
  const functionName = 'server: controllers/admin/book/getTop3ByVisitCount'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.query))
  let responseResult = { errorCode: errorCode.SUCCESS }

  try {
    responseResult = await bookManager.queryTopByVisitCount()
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  return res.status(200).send(responseResult)
}

/**
 * Groups user books by tags.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function groupUserBooksByTags (req, res, next) {
  const functionName = 'server: controllers/admin/book/groupUserBooksByTags'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.query))
  let responseResult = { errorCode: errorCode.SUCCESS }

  try {
    responseResult = await userBookManager.groupUserBooksByTags()
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  return res.status(200).send(responseResult)
}

/**
 * Groups user books by user.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function groupUserBooksByUser (req, res, next) {
  const functionName = 'server: controllers/admin/book/groupUserBooksByUser'
  // logs request info.
  logUtil.logDebugMsg(functionName, JSON.stringify(req.query))
  let responseResult = { errorCode: errorCode.SUCCESS }

  try {
    responseResult = await userBookManager.groupUserBooksByUser()
  } catch (error) {
    responseResult = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_CALL_MANAGER + JSON.stringify(error) }
    logUtil.logErrorMsg(functionName, responseResult.errorMsg)
  }

  return res.status(200).send(responseResult)
}

exports.update = update
exports.queryAll = queryAll
exports.deleteBooks = deleteBooks
exports.getTop3ByVisitCount = getTop3ByVisitCount
exports.groupUserBooksByUser = groupUserBooksByUser
exports.groupUserBooksByTags = groupUserBooksByTags
