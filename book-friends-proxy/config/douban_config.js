module.exports = {
  baseUrl: 'https://api.douban.com/v2/book',
  getBookByISBNUrl () {
    return this.baseUrl + '/isbn/'
  }
}
