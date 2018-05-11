const BookInfo = require('../models').BookInfo
const PAGE_SIZE = require('../config/systemConfig').pageSize

async function saveBook (data) {
  if (data) {
    const find = await BookInfo.findOne({isbn: data.isbn})
    if (!find) {
      const bookInfo = new BookInfo(data)

      if (data.status === 0) {
        bookInfo.isNews = true
      } else if (data.status === 1) {
        bookInfo.isHot = true
      }
      await bookInfo.save()
    } else {
      data.isActive = true
      await BookInfo.update({isbn: data.isbn}, data)
    }
  }
}

/**
 * Updates books if isActive is null.
 */
async function updateBooksIfIsActiveIsNULL () {
  const books = await BookInfo.find({isNews: null, isHot: null})

  if (books && books.length) {
    for (let i = 0; i < books.length; i++) {
      const b = books[i]
      b.isNews = false
      b.isHot = false
      await BookInfo.update({isbn: b.isbn}, b)
    }
  }
}

// =============================================================================
// the dev environnment
// =============================================================================

/**
 * Querys new books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryNewBooks (pageIndex, keyWord) {
  let data = null

  // Querys certain books according to current page index.
  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    const regEx = new RegExp(keyWord, 'i')
    data = await BookInfo.find({isNews: true, title: regEx, isActive: true}).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Gets the new books' total count.
 * @param {*String} keyWord
 */
async function getNewBooksTotalCount (keyWord) {
  let count = 0

  const regEx = new RegExp(keyWord, 'i')
  count = await BookInfo.find({isNews: true, title: regEx, isActive: true}).count()

  return count
}

/**
 * Querys hot books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryHotBooks (pageIndex, keyWord) {
  let data = null

  // Querys certain books according to current page index.
  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    const regEx = new RegExp(keyWord, 'i')
    data = await BookInfo.find({isHot: true, title: regEx}).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Gets the hot books' total count.
 * @param {*String} keyWord
 */
async function getHotBooksTotalCount (keyWord) {
  let count = 0

  const regEx = new RegExp(keyWord, 'i')
  count = await BookInfo.find({isHot: true, title: regEx, isActive: true}).count()

  return count
}

/**
 * Querys recommened books.
 * @param {*Number} pageIndex
 * @param {*String} keyWord
 */
async function queryRecommendBooks (pageIndex, flags) {
  let data = null

  // Querys certain books according to current page index.
  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    data = await BookInfo.where('flag').in(flags).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Querys books from TOP 250.
 * @param {*Number} pageIndex
 */
async function queryTopBooks (pageIndex) {
  let data = null

  if (pageIndex > 0) {
    const skipCount = PAGE_SIZE * (pageIndex - 1)
    data = await BookInfo.find({isNews: false, isHot: false}).skip(skipCount).limit(PAGE_SIZE)
  }

  return data
}

/**
 * Querys book by isbn.
 * @param {*String} isbn
 */
async function queryBookByISBN (isbn) {
  let book = null

  if (isbn) {
    book = await BookInfo.findOne({isbn: isbn, isActive: true})
  }

  return book
}

/**
 * Querys the certain fields by isbn.
 * @param {*String} isbn
 */
async function queryCertainFieldsByISBN (isbn) {
  let book = null

  if (isbn) {
    book = await BookInfo.findOne({isbn: isbn, isActive: true}, '-_id isbn images title author summary')
  }

  return book
}

async function getTotalCount () {
  let count = 0

  count = await BookInfo.find({}).count()

  return count
}

/**
 * Querys all books.
 */
async function queryAll (pageIndex, pageSize) {
  let books = []
  if (pageIndex > 0) {
    if (!pageSize) {
      pageSize = PAGE_SIZE
    }

    const skipCount = (pageIndex - 1) * pageSize
    books = await BookInfo.find({}).skip(skipCount).limit(pageSize)
  }
  return books
}

/**
 *
 * @param {*Array} isbns
 */
async function deleteBooks (isbns) {
  let result = null

  if (isbns) {
    result = await BookInfo.deleteMany({isbn: {$in: isbns}})
  }

  return result
}

/**
 * Updates one book
 * @param {*JSON} bookParams
 */
async function updateBook (bookParams) {
  let result = null

  if (bookParams && bookParams.isbn) {
    result = await BookInfo.update({isbn: bookParams.isbn}, bookParams)
  }

  return result
}

exports.queryAll = queryAll
exports.saveBook = saveBook
exports.updateBook = updateBook
exports.deleteBooks = deleteBooks
exports.getTotalCount = getTotalCount
exports.queryTopBooks = queryTopBooks
exports.queryNewBooks = queryNewBooks
exports.queryHotBooks = queryHotBooks
exports.queryBookByISBN = queryBookByISBN
exports.queryRecommendBooks = queryRecommendBooks
exports.getNewBooksTotalCount = getNewBooksTotalCount
exports.getHotBooksTotalCount = getHotBooksTotalCount
exports.queryCertainFieldsByISBN = queryCertainFieldsByISBN
exports.updateBooksIfIsActiveIsNULL = updateBooksIfIsActiveIsNULL //  for test
