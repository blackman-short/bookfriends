const logUtil = require('../../utils/logUtil')
const errorMsg = require('../../error/errorMsg')
const bookDal = require('../../dal/bookDal')
const errorCode = require('../../error/errorCode')

/**
 * Querys all books.
 */
async function queryAll (pageIndex, pageSize) {
  const funcName = 'server: managers/admin/book/queryAll'
  let result = null

  try {
    const loadResults = await Promise.all([bookDal.queryAll(pageIndex, pageSize), bookDal.getTotalCount()])
    if (loadResults && loadResults.length === 2) {
      const data = {
        books: loadResults[0],
        totalCount: loadResults[1]
      }
      result = { errorCode: errorCode.SUCCESS, data: data }
    } else {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA }
    }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

/**
 * Updates one book by isbn.
 * @param {*String} isbn
 */
async function update (bookInfo) {
  const funcName = 'server: managers/admin/book/update'
  let result = { errorCode: errorCode.PARAMETER_ERRORMSG, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (bookInfo) {
    try {
      const data = await bookDal.updateBook(bookInfo)
      if (data) {
        result = { errorCode: errorCode.SUCCESS }
      } else {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_UPDATE_DB }
      }
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_UPDATE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

/**
 * Deletes books by isbns.
 * @param {*Array} isbns
 */
async function deleteBooks (isbns) {
  const funcName = 'server: managers/admin/book/deleteBooks'
  let result = { errorCode: errorCode.PARAMETER_ERRORMSG, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (isbns) {
    try {
      const data = await bookDal.deleteBooks(isbns)
      if (data) {
        result = { errorCode: errorCode.SUCCESS }
      } else {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_DELETE_DB }
      }
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_DELETE_DB + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  return result
}

exports.update = update
exports.queryAll = queryAll
exports.deleteBooks = deleteBooks
