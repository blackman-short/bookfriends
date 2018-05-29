module.exports = {
  baseUrl: 'http://104.194.94.3:3002/bookcircle',
  // baseUrl: 'http://localhost:3002/bookcircle',
  registerUrl: function () {
    return this.baseUrl + '/admin/register'
  },
  loginUrl: function () {
    return this.baseUrl + '/admin/login'
  },
  adminsUrl: function () {
    return this.baseUrl + '/admin/all'
  },
  updateAdmin: function () {
    return this.baseUrl + '/admin/update'
  },
  deleteAdmin: function () {
    return this.baseUrl + '/admin/delete'
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
  chartGroup: function () {
    return this.baseUrl + '/admin/user/chartgroup'
  },
  chartCity: function () {
    return this.baseUrl + '/admin/user/citychart'
  },
  getUserDynamics: function () {
    return this.baseUrl + '/admin/user/newdynamics'
  },
  getOnlineUsers: function () {
    return this.baseUrl + '/admin/user/onlineusers'
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
  },
  getTop3: function () {
    return this.baseUrl + '/admin/book/top'
  },
  getWeekVisit: function () {
    return this.baseUrl + '/admin/book/weekvisits'
  },
  chartTags: function () {
    return this.baseUrl + '/admin/book/grouptags'
  },
  chartUserBook: function () {
    return this.baseUrl + '/admin/book/groupusers'
  }
  // #endregion
}