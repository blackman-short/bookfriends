module.exports = {
  baseUrl: 'http://104.194.94.3:3002/bookcircle',
  register: '',
  loginUrl: function () {
    return this.baseUrl + '/user/login'
  },
  searchUrl: function () {
    return this.baseUrl + '/user/search'
  }
}