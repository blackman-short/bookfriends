const bookDal = require('../dal/bookInfo')
const mockConfig = require('../config/mockConfig')
const commonRequest = require('../common/common_request')

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

async function queryCertainFields () {
  const result = await bookDal.queryCertainFields()
  return result
}

async function pageQuery () {
  const result = await bookDal.pageQuery()
  return result
}

exports.pageQuery = pageQuery
exports.queryCertainFields = queryCertainFields
exports.saveBook = saveBook
