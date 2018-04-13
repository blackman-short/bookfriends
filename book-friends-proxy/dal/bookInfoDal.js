const BookInfo = require('../models').BookInfo

/**
 * Querys books from db according to keyword.
 * @param {*String} keyWord 关键字
 */
async function queryBooksByKeyWord (keyWord) {
  let loadData = null

  if (keyWord) {
    loadData = await BookInfo.find({title: keyWord})
  }

  return loadData
}

/**
 * Batches to save books
 * @param {*Array} books
 */
async function saveBooks (books) {
  if (books && books.length > 0) {
    // await BookInfo.insert(books)
    for (let i = 0; i < books.length; i++) {
      const book = books[i]
      const find = await BookInfo.find({isbn: book.isbn})
      if (!find || (find && find.length < 1)) {
        const bookInfo = new BookInfo(book)
        await bookInfo.save()
      }
    }
  }
}

exports.saveBooks = saveBooks
exports.queryBooksByKeyWord = queryBooksByKeyWord
