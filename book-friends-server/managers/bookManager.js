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
      const book = bookConvertor(JSON.parse(loadData))
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
 * @param {*Number} pageIndex
 * @param {*String} keyWord
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
    logUtil.logDebugMsg(functionName, queryResult.errorMsg + `userId: ${userId}`)
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
  const readBooks = await userBookDal.queryUserBookInfoByUserId(userInfo.id)
  if (readBooks && readBooks.length > 0) {
    readBooks.forEach(b => {
      const tags = b.tags
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

/**
 * User stores up onne book.
 * @param {*String} userId 用户ID
 * @param {*String} isbn 书籍的标识ISBN
 * @param {*Array} tags 书籍的标识
 */
async function storeUpBook (userId, isbn) {
  const funcName = 'server: managers/book/storeUpBook'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  // Gets the book's tags according to book's isbn.
  let bookInfo = null

  // Validates the user info.
  if (userId) {
    const userInfo = await userDal.queryUserInfoById(userId)
    if (!userInfo) {
      result = { errorCode: errorCode.USER_NOTEXISTED, errorMsg: `${errorMsg.USER_NOTEXISTED}, userId: ${userId}` }
      logUtil.logDebugMsg(funcName, result.errorMsg)
      return result
    }
  }

  if (isbn) {
    // 1. Querys the book's tags from local DB.
    const loadData = await bookDal.queryBookByISBN(isbn)
    if (loadData) {
      bookInfo = loadData
    } else {
      // 2. Querys the book's tags from douban if local DB does not exist.
      const reqData = {
        // isbn: isbn
      }
      // Calls proxy server.
      let response = null
      logUtil.logDebugMsg(funcName, JSON.stringify(reqData))
      try {
        response = await commonRequest.post(proxyConfig.getBookInfoByISBN(), reqData)
      } catch (error) {
        result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + JSON.stringify(error) }
        logUtil.logErrorMsg(funcName, result.errorMsg)
      }

      if (response) {
        response = JSON.parse(response)
        if (response.errorCode === errorCode.SUCCESS && response.data) {
          bookInfo = response.data
        } else {
          return response
        }
      } else {
        result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + 'Fails to call douban server: the response is null' }
        logUtil.logDebugMsg(funcName, result.errorMsg)
        return result
      }
    }
  }

  // Saves the book to db.
  if (bookInfo) {
    const mapBook = bookConvertor(bookInfo)
    if (mapBook) {
      const tags = tagsConvertor(mapBook.tags)
      try {
        const storeResult = await userBookDal.storeUpBook(userId, isbn, tags)
        if (storeResult.errorCode === errorCode.SUCCESS) {
          // async operation: save the query result to local DB.
          bookDal.saveBook(mapBook)
          result = { errorCode: errorCode.SUCCESS }
        } else {
          return storeResult
        }
      } catch (error) {
        result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_INSERT_DB + JSON.stringify(error) }
        logUtil.logErrorMsg(funcName, result.errorMsg)
      }
    }
  }

  return result
}

/**
 * Querys the certain book's info by ISBN.
 * @param {*String} isbn
 */
async function queryBookInfoByISBN (isbn) {
  const funcName = 'server: managers/book/queryBookInfoByISBN'
  let result = { errorCode: errorCode.PARAMETER_ERRORMSG, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  let loadResult = null
  if (isbn) {
    try {
      loadResult = await Promise.all([bookDal.queryBookByISBN(isbn), userBookDal.getUserBookInfoByISBN(isbn)]).then()
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  if (loadResult && loadResult.length === 2) {
    result = { errorCode: errorCode.SUCCESS, data: loadResult[0], hasStored: false }
    if (loadResult[1]) {
      result.hasStored = true
    }
  }

  return result
}

/**
 * Converts douBook to local book.
 * @param {*Object} douBook
 */
function bookConvertor (data) {
  let mapBook = null
  if (data) {
    mapBook = {
      isbn: data.isbn13,
      author: data.author, // 作者
      authorIntro: data.author_intro, // 作者介绍
      translator: data.translator, // 译者
      title: data.title, // 书名
      originTitle: data.origin_title, // 书的原名
      publisher: data.publisher, // 出版社
      pubdate: data.pubdate, // 出版时间
      images: data.images, // 图片路径集合： small, middle, large.
      price: data.price, // 价格： douban '89.00元'
      catalog: data.catalog, // 目录
      summary: data.summary, // 综述
      tags: data.tags,
      rating: data.rating.average == null ? 0 : Number(data.rating.average), // 评分
      ebookUrl: data.ebook_url == null ? '' : data.ebook_url // 电子书网址
    }
  }
  return mapBook
}

/**
 * Converts Array<JSON> to Array<String>
 * @param {*JSONArray} tags
 */
function tagsConvertor (tags) {
  let mapTags = []

  if (tags && tags.length > 0) {
    tags.forEach(tag => {
      const tagName = tag.name
      if (mapTags.indexOf(tagName) < 0) {
        mapTags.push(tagName)
      }
    })
  }

  return mapTags
}

exports.saveBook = saveBook
exports.storeUpBook = storeUpBook
exports.queryNewBooks = queryNewBooks
exports.queryHotBooks = queryHotBooks
exports.queryBookInfoByISBN = queryBookInfoByISBN
exports.queryRecommendBooks = queryRecommendBooks
