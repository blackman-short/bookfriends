module.exports = {
  proxyBaseUrl: 'http://104.194.94:3003/bookcircle',
  getRecommendBookUrl () {
    return this.proxyBaseUrl + '/book/recommend'
  }
}
