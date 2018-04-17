const logUtil = require('../../utils/logUtil')
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

exports.getBookInfoByISBN = getBookInfoByISBN
