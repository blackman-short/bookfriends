module.exports = {
  queryCount: 10,
  baseUrl: 'https://api.douban.com/v2/book',
  getBookByISBNUrl () {
    return this.baseUrl + '/isbn/'
  },
  getBooksByTag () {
    return this.baseUrl + '/search'
  }
}
