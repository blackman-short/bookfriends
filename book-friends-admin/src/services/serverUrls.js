module.exports = {
  // baseUrl: 'http://104.194.94.3:3002/bookcircle',
  baseUrl: 'http://localhost:3002/bookcircle',
  registerUrl: function () {
    return this.baseUrl + '/admin/register'
  },
  loginUrl: function () {
    return this.baseUrl + '/admin/login'
  },
  // #region User operations
  usersUrl: function () {
    return this.baseUrl + '/admin/user/all'
  },
  updateUser: function () {
    return this.baseUrl + '/admin/user/update' 
  },
  deleteUser: function () {
    return this.baseUrl + '/admin/user/delete'
  },
  // #endregion

  // #region Book operations
  booksUrl: function () {
    return this.baseUrl + '/admin/book/all'
  },
  updateBook: function () {
    return this.baseUrl + '/admin/book/update'
  },
  deleteBook: function () {
    return this.baseUrl + '/admin/book/delete'
  }
  // #endregion
}