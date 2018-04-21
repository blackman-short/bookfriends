module.exports = {
  queryCount: 10,
  baseUrl: 'https://api.douban.com/v2/book',
  getBookByISBNUrl () {
    return this.baseUrl + '/isbn/'
  },
  searchBooks () {
    return this.baseUrl + '/search'
  }
}
