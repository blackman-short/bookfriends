const bookDal = require('../dal/bookDal')
const userDal = require('../dal/userDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userBookDal = require('../dal/userBookDal')
const mockConfig = require('../config/mockConfig')
const proxyConfig = require('../config/proxyConfig')
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
      const book = JSON.parse(loadData)
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
    logUtil.logErrorMsg('server: managers/book/queryNewBooks', loadResult.errorMsg)
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
    logUtil.logErrorMsg('server: managers/book/queryHotBooks', loadResult.errorMsg)
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
  // If user has hobbies.
  if (hobbies.length > 0) {
    const postData = {
      hobbies: JSON.stringify(hobbies)
    }
    try {
      response = await commonRequest.post(proxyConfig.getRecommendBookUrl(), postData)
    } catch (error) {
      queryResult = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + error.message }
      logUtil.logErrorMsg(functionName, queryResult.errorMsg)
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
 * @param {*String} userId
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
  const tagsList = await userBookDal.queryUserBookInfoByUserId(userInfo.id)
  if (tagsList && tagsList.length > 0) {
    tagsList.forEach(tags => {
      if (tags && tags.length > 0) {
        tags.forEach(tag => {
          if (hobbies.indexOf(tag) < 0) {
            hobbies.push(tag)
          }
        })
      }
    })
  }

  return hobbies
}

exports.saveBook = saveBook
exports.queryNewBooks = queryNewBooks
exports.queryHotBooks = queryHotBooks
exports.queryRecommendBooks = queryRecommendBooks
