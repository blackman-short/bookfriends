module.exports = {
  proxyBaseUrl: 'http://127.0.0.1:3003/bookcircle',
  getRecommendBookUrl () {
    return this.proxyBaseUrl + '/book/recommend'
  }
}
