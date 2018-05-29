const tools = require('../utils/tools')
const types = require('../utils/types')
const bookDal = require('../dal/bookDal')
const userDal = require('../dal/userDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userBookDal = require('../dal/userBookDal')
const mockConfig = require('../config/mockConfig')
const proxyConfig = require('../config/proxyConfig')
const visitRecordDal = require('../dal/visitRecordDal')
const commonRequest = require('../common/common_request')

// #region practice
async function saveBook () {
  const books = mockConfig.top250BooksFormDouBan

  for (let i = 0; i < 100; i++) {
    const isbn = books[i].isbn
    const requestUrl = `https://api.douban.com/v2/book/isbn/${isbn}`
    let loadData = null
    try {
      loadData = await commonRequest.get(requestUrl, null)
    } catch (error) {
      logUtil.logErrorMsg('server: managers/book/save', 'Fails to request douban')
      return { errorCode: errorCode.ERROR_REQUEST, errorMsg: `Fails to request douban: ${error.message}` }
    }
    if (loadData) {
      const book = types.bookConvertor(JSON.parse(loadData))
      if (i < 50) {
        book.status = 0
      } else if (i >= 50 && i < 100) {
        book.status = 1
      } else {
        // nothing to do.
      }
      await bookDal.saveBook(book)
    }
  }

  return { errorCode: errorCode.SUCCESS }
}

async function addVisitCountForBook () {
  await bookDal.addVisitCountForBook()
}
// #endregion

// =============================================================================
// the dev environnment
// =============================================================================

/**
 * Querys new books.
 * @param {Number} pageIndex
 * @param {String} keyWord
 */
async function queryNewBooks (pageIndex, keyWord) {
  let loadResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  let data = null
  let totalCount = 0
  try {
    data = await bookDal.queryNewBooks(pageIndex, keyWord)
    totalCount = await bookDal.getNewBooksTotalCount(keyWord)
  } catch (error) {
    loadResult = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + error.message }
    logUtil.logErrorMsg('server: managers/book/queryNewBooks', loadResult.errorMsg)
  }

  if (data) {
    loadResult = { errorCode: errorCode.SUCCESS, data: data, totalCount: totalCount }
  }

  return loadResult
}

/**
 * Quers hot books.
 * @param {Number} pageIndex
 * @param {String} keyWord
 */
async function queryHotBooks (pageIndex, keyWord) {
  let loadResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  let data = null
  let totalCount = 0

  try {
    data = await bookDal.queryHotBooks(pageIndex, keyWord)
    totalCount = await bookDal.getHotBooksTotalCount(keyWord)
  } catch (error) {
    loadResult = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + error.message }
    logUtil.logErrorMsg('server: managers/book/queryHotBooks', loadResult.errorMsg)
  }

  if (data) {
    loadResult = { errorCode: errorCode.SUCCESS, data: data, totalCount: totalCount }
  }

  return loadResult
}

/**
 * Querys books accroding to user's hobbies & readed books.
 * @param {Number} pageIndex
 * @param {Array} flags
 */
async function queryRecommendBooks (pageIndex, userId) {
  const functionName = 'server: managers/book/queryRecommendBooks'
  let queryResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  const userInfo = await userDal.queryUserInfoById(userId)
  // validates the userId is right.
  if (!userInfo) {
    queryResult = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED + `: userId: ${userId}` }
    logUtil.logDebugMsg(functionName, queryResult.errorMsg + `userId: ${userId}`)
    return queryResult
  }

  // Gets user's hobbies according to user's readed books & setted hobbies.
  const hobbies = await getUserHobbiesByUser(userInfo)
  let response = null
  // If user has hobbies.
  if (hobbies.length > 0) {
    const postData = {
      hobbies: JSON.stringify(hobbies),
      pageIndex: pageIndex
    }
    try {
      response = await commonRequest.post(proxyConfig.getRecommendBookUrl(), postData)
    } catch (error) {
      queryResult = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + error.message }
      logUtil.logErrorMsg(functionName, queryResult.errorMsg)
      return queryResult
    }
  // If user has nohobbies, get books from TOP 250.
  } else {
    let books = null
    try {
      books = await bookDal.queryTopBooks(pageIndex)
      response = { errorCode: errorCode.SUCCESS, data: books }
    } catch (error) {
      response = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + error.message }
      logUtil.logErrorMsg(functionName, response.errorMsg)
    }
  }

  if (!response) {
    queryResult = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + 'return no response' }
    logUtil.logErrorMsg(functionName, queryResult.errorMsg)
  } else {
    queryResult = response
  }

  return queryResult
}

/**
 * Gets user's hobbies according to userId.
 * @param {String} userId
 */
async function getUserHobbiesByUser (userInfo) {
  let hobbies = []

  // Personal info's hobby.
  if (userInfo.hobbies && userInfo.hobbies.length > 0) {
    userInfo.hobbies.forEach(h => {
      hobbies.push(h)
    })
  }

  // Gets hobbies by the user's readed books.
  const readBooks = await userBookDal.queryUserBookInfoByUserId(userInfo.id)
  if (readBooks && readBooks.length > 0) {
    readBooks.forEach(b => {
      const tags = b.tags
      if (tags && tags.length > 0) {
        // tags.forEach(tag => {
        //   if (hobbies.indexOf(tag) < 0) {
        //     hobbies.push(tag)
        //   }
        // })
        const tag = tags[2]
        if (hobbies.indexOf(tag) < 0) {
          hobbies.push(tag)
        }
      }
    })
  }

  return hobbies
}

/**
 * Querys the certain book's info by ISBN.
 * @param {String} isbn
 * @param {String} userId
 */
async function queryBookInfoByISBN (isbn, userId) {
  const funcName = 'server: managers/book/queryBookInfoByISBN'
  let result = { errorCode: errorCode.PARAMETER_ERRORMSG, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  let loadResult = null
  if (isbn) {
    try {
      loadResult = await Promise.all([bookDal.queryBookByISBN(isbn), userBookDal.getUserBookByUserIdAndISBN(userId, isbn)]).then()
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  if (loadResult && loadResult.length === 2) {
    // async to updates visit count, then rank the books again.
    await Promise.all([bookDal.addVisitCount(isbn), visitRecordDal.updateVisitRecord(userId, isbn)]).then()
    let hour = tools.getCurrentHour()
    if (hour === 23) {
      bookDal.rankBook()
    }
    result = { errorCode: errorCode.SUCCESS, data: loadResult[0], hasStored: false }
    if (loadResult[1]) {
      result.hasStored = true
    }
  }

  return result
}

exports.saveBook = saveBook
exports.addVisitCountForBook = addVisitCountForBook // for test
exports.queryNewBooks = queryNewBooks
exports.queryHotBooks = queryHotBooks
exports.queryBookInfoByISBN = queryBookInfoByISBN
exports.queryRecommendBooks = queryRecommendBooks
