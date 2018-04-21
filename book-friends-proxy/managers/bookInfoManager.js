const types = require('../utils/types')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const bookDal = require('../dal/bookInfoDal')
const bookProxy = require('../proxy/douban/bookInfoProxy')
const doubanConfig = require('../config/douban_config')

/**
 * Querys recommend books from douban.
 * @param {*Array} hobbies
 */
async function queryRecommendBooks (hobbies) {
  const funcName = 'proxy: managers/book/queryRecommendBooks'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  if (!hobbies || !types.isArray(hobbies)) {
    return result
  }

  try {
    result = await getBooksByTags(hobbies)
    // sync operations.
    if (result.errorCode === errorCode.SUCCESS) {
      const books = result.data
      if (books && books.length > 0) {
        bookDal.saveBooks(books)
      }
    }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + error.message }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

async function getBooksByTags (hobbies) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  let books = []
  if (!hobbies || !types.isArray(hobbies) || hobbies.length <= 0) {
    return result
  }

  const divCount = doubanConfig.queryCount / hobbies.length
  const queryCount = divCount < 1 ? 1 : divCount
  for (let i = 0; i < hobbies.length; i++) {
    let queryResult = await bookProxy.getBookByTagFromDouBan(hobbies[i], queryCount)
    if (queryResult.errorCode === errorCode.SUCCESS) {
      const bs = queryResult.data
      if (bs && bs.length > 0) {
        bs.forEach(b => {
          books.push(b)
        })
      }
    } else {
      return queryResult
    }
  }

  result = { errorCode: errorCode.SUCCESS, data: books }

  return result
}

exports.queryRecommendBooks = queryRecommendBooks
