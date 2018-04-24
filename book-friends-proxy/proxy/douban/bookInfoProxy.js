const types = require('../../utils/types')
const logUtil = require('../../utils/logUtil')
const bookDal = require('../../dal/bookInfoDal')
const errorMsg = require('../../error/errorMsg')
const errorCode = require('../../error/errorCode')
const doubanConfig = require('../../config/douban_config')
const commonRequest = require('../../common/common_request')

/**
 * Calls douban server to get book info by isbn.
 * @param {*String} isbn
 */
async function getBookInfoByISBN (isbn) {
  const funcName = 'proxy: proxy/douban/book/getBookInfoByISBN'
  let loadResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (!isbn) {
    loadResult.errorMsg = `isbn: ${errorMsg.PARAMETER_ERRORMSG}`
    logUtil.logDebugMsg(funcName, loadResult.errorMsg)
    return loadResult
  }

  // Calls douban server.
  let bookInfo = null
  const reqUrl = doubanConfig.getBookByISBNUrl() + isbn
  try {
    bookInfo = await commonRequest.get(reqUrl, null)
    console.log(Object.prototype.toString.call(bookInfo).toLowerCase())
  } catch (error) {
    loadResult = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST }
    logUtil.logErrorMsg(funcName, loadResult.errorMsg + JSON.stringify(error))
  }

  // If return response.
  if (bookInfo) {
    loadResult = { errorCode: errorCode.SUCCESS, data: JSON.parse(bookInfo) }
  } else {
    loadResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: `Fails to get response from douban, for the response is null` }
    logUtil.logDebugMsg(funcName, loadResult.errorMsg)
  }

  return loadResult
}

/**
 * Searches books by calling douban server.
 * @param {*String} keyWord
 */
async function searchBooks (keyWord, pageIndex) {
  const funcName = 'proxy: managers/book/getBookByTagFromDouBan'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  let books = []

  if (!keyWord && pageIndex < 1) {
    return books
  }

  let response = null
  const startIndex = (pageIndex - 1) * doubanConfig.queryCount
  try {
    const reqData = {
      q: keyWord,
      start: startIndex,
      count: doubanConfig.queryCount
    }
    logUtil.logDebugMsg(funcName, `call douban server: url - ${doubanConfig.searchBooks()}; param - ${keyWord}`)
    response = await commonRequest.get(doubanConfig.searchBooks(), reqData)
  } catch (error) {
    result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST }

    if (error.code === 'ENOENT') {
      result.errorMsg = 'NetWork errored'
    }
    logUtil.logErrorMsg(funcName, result.errorMsg + JSON.stringify(error))
    return result
  }

  if (!response) {
    result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + 'return response is null' }
    logUtil.logDebugMsg(funcName, 'get response is null from douban')
  } else {
    // Converts getted books.
    response = JSON.parse(response)
    response.books.forEach(b => {
      books.push(types.bookConvertor(b))
    })
    result = { errorCode: errorCode.SUCCESS, data: books }
    // asyn save books to local DB.
    bookDal.saveBooks(books)
  }

  return result
}

/**
 * Gets books from douban by tag.
 * @param {*String} hobby
 */
async function getBookByTagFromDouBan (hobby, queryCount, pageIndex) {
  const funcName = 'proxy: managers/book/getBookByTagFromDouBan'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  let books = []

  if (!hobby) {
    return books
  }

  let response = null
  try {
    const reqData = {
      tag: hobby,
      count: queryCount,
      start: (pageIndex - 1) * queryCount
    }
    logUtil.logDebugMsg(funcName, `call douban server: url - ${doubanConfig.searchBooks()}; param - ${hobby}`)
    response = await commonRequest.get(doubanConfig.searchBooks(), reqData)
  } catch (error) {
    result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST }

    if (error.code === 'ENOENT') {
      result.errorMsg = 'NetWork errored'
    }
    logUtil.logErrorMsg(funcName, result.errorMsg + JSON.stringify(error))
    return result
  }

  if (!response) {
    result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + 'return response in null' }
    logUtil.logDebugMsg(funcName, 'get response is null from douban')
  } else {
    // Converts getted books.
    response = JSON.parse(response)
    response.books.forEach(b => {
      books.push(types.bookConvertor(b))
    })
    result = { errorCode: errorCode.SUCCESS, data: books }
  }

  return result
}

exports.searchBooks = searchBooks
exports.getBookInfoByISBN = getBookInfoByISBN
exports.getBookByTagFromDouBan = getBookByTagFromDouBan
