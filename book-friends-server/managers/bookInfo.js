const bookDal = require('../dal/bookInfo')
const userDal = require('../dal/userInfo')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const mockConfig = require('../config/mockConfig')
const userBookDal = require('../dal/userBooksInfo')
const proxyConfig = require('../config/proxyConfig')
const commonRequest = require('../common/common_request')

// #region practice
async function saveBook () {
  const books = mockConfig.top250BooksFormDouBan
  console.log(books.length)
  for (let i = 174; i < books.length; i++) {
    const isbn = books[i].isbn
    console.log(isbn)
    const requestUrl = `https://api.douban.com/v2/book/isbn/${isbn}`
    const loadData = await commonRequest.get(requestUrl, null)
    if (loadData) {
      bookDal.saveBook(JSON.parse(loadData))
    }
  }
  console.log('-----------')
}
// #endregion

// =============================================================================
// the dev environnment
// =============================================================================

/**
 * Querys new books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryNewBooks (pageIndex, keyWord) {
  let loadResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  let data = null

  try {
    data = await bookDal.queryNewBooks(pageIndex, keyWord)
  } catch (error) {
    loadResult = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + error.message }
  }

  if (data) {
    loadResult = { errorCode: errorCode.SUCCESS, data: data }
  }

  return loadResult
}

/**
 * Quers hot books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryHotBooks (pageIndex, keyWord) {
  let loadResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  let data = null

  try {
    data = await bookDal.queryHotBooks(pageIndex, keyWord)
  } catch (error) {
    loadResult = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + error.message }
  }

  if (data) {
    loadResult = { errorCode: errorCode.SUCCESS, data: data }
  }

  return loadResult
}

/**
 * Querys books accroding to user's hobbies & readed books.
 * @param {*Number} pageIndex
 * @param {*Array} flags
 */
async function queryRecommendBooks (pageIndex, userId) {
  const functionName = 'server: managers/book/queryRecommendBooks'
  let queryResult = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  const userInfo = await userDal.queryUserInfoById(userId)
  // validates the userId is right.
  if (!userInfo) {
    queryResult = { errorCode: errorCode.ERROR_USER_NOTEXISTED, errorMsg: errorMsg.USER_NOTEXISTED + `: userId: ${userId}` }
    return queryResult
  }

  // Gets user's hobbies according to user's readed books & setted hobbies.
  const hobbies = await getUserHobbiesByUser(userInfo)
  let response = null
  if (hobbies.length > 0) {
    const postData = {
      hobbies: hobbies
    }
    try {
      response = await commonRequest.post(proxyConfig.getRecommendBookUrl(), postData)
    } catch (error) {
      queryResult = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + error.message }
      logUtil.logErrorMsg(functionName, queryResult.errorMsg)
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
 * @param {*String} userId
 */
async function getUserHobbiesByUser (userInfo) {
  let hobbies = []

  if (userInfo.hobbies && userInfo.hobbies.length > 0) {
    userInfo.hobbies.forEach(h => {
      hobbies.push(h)
    })
  }

  const readedFlags = await userBookDal.queryUserBookInfoByUserId(userInfo.id)
  if (readedFlags) {
    readedFlags.forEach(flag => {
      hobbies.push(flag)
    })
  }
}

exports.saveBook = saveBook
exports.queryNewBooks = queryNewBooks
exports.queryHotBooks = queryHotBooks
exports.queryRecommendBooks = queryRecommendBooks
