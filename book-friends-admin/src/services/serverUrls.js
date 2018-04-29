module.exports = {
  // baseUrl: 'http://104.194.94.3:3002/bookcircle',
  baseUrl: 'http://localhost:3002/bookcircle',
  registerUrl: function () {
    return this.baseUrl + '/admin/register'
  },
  loginUrl: function () {
    return this.baseUrl + '/admin/login'
  },
  searchUrl: function () {
    return this.baseUrl + '/admin/search'
  }
}