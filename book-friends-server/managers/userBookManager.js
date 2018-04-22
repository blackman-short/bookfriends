const types = require('../utils/types')
const bookDal = require('../dal/bookDal')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const userBookDal = require('../dal/userBookDal')

/**
 * Gets user's books.
 * @param {*String} userId
 */
async function getUserBooks (userId) {
  const funcName = 'server: managers/userbook/getUserBooks'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }

  if (!userId) {
    logUtil.logDebugMsg(funcName, result.errorMsg + 'userId is null')
    return result
  }

  let isbnArray = []
  try {
    const userBookInfos = await userBookDal.queryUserBookInfoByUserId(userId)
    // Gets the isbns of user's books.
    if (userBookInfos && userBookInfos.length > 0) {
      isbnArray = filterUserBookISBN(userBookInfos)
    }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  // Querys user book's info.
  let userBooks = []
  if (isbnArray.length > 0) {
    try {
      for (let i = 0; i < isbnArray.length; i++) {
        const bookInfo = await bookDal.queryCertainFieldsByISBN(isbnArray[i])
        if (bookInfo) {
          userBooks.push(bookInfo)
        }
      }
    } catch (error) {
      result = { errorCode: errorCode.ERROR_DB, errorMsg: errorMsg.ERROR_LOAD_DBDATA + JSON.stringify(error) }
      logUtil.logErrorMsg(funcName, result.errorMsg)
    }
  }

  result = { errorCode: errorCode.SUCCESS, data: userBooks }

  return result
}

/**
 * Filters and gets the isbns of the user's books.
 * @param {*Array} userBookInfos
 */
function filterUserBookISBN (userBookInfos) {
  let isbnArray = []

  if (userBookInfos && types.isArray(userBookInfos) && userBookInfos.length > 0) {
    userBookInfos.forEach(u => {
      const isbn = u.isbn
      if (isbnArray.indexOf(isbn) < 0) {
        isbnArray.push(isbn)
      }
    })
  }

  return isbnArray
}

exports.getUserBooks = getUserBooks
