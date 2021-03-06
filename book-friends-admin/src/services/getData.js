const reqUrl = require('./serverUrls')
const get = require('./request').default.get
const post = require('./request').default.post

const API = {
  // #region Admin operations
  register: async function (realName, adminName, password, phoneNumber, email) {
    const postData = {
      realName: realName,
      adminName: adminName,
      password: password,
      phoneNumber: phoneNumber,
      email: email
    }

    const response =  await post(reqUrl.registerUrl(), postData)
    return response
  },
  login: async function (phoneNumber, password) {
    const postData = {
      phoneNumber: phoneNumber,
      password: password
    }

    const response =  await post(reqUrl.loginUrl(), postData)
    return response
  },
  getAdmins: async function (pageIndex, pageSize) {
    const getData = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    const response = await get(reqUrl.adminsUrl(), getData)
    return response
  },
  updateAdmin: async function (adminInfo) {
    const postData = adminInfo
    const response =  await post(reqUrl.updateAdmin(), postData)
    return response
  },
  deleteAdmin: async function (id) {
    const postData = {
      id: id
    }
    const response =  await post(reqUrl.deleteAdmin(), postData)
    return response
  },
  // #endregion

  // #region User operations
  getUsers: async function (index, pageSize) {
    const getData = {
      pageIndex: index,
      pageSize: pageSize
    }
    const response = await get(reqUrl.usersUrl(), getData)
    return response
  },
  updateUser: async function (phoneNumber) {
    const getData = {
      phoneNumber: phoneNumber
    }
    const response = await post(reqUrl.updateUser(), getData)
    return response
  },
  deleteUser: async function (phoneNumber) {
    const getData = {
      phoneNumber: phoneNumber
    }
    const response = await post(reqUrl.deleteUser(), getData)
    return response
  },
  getChartGroup: async function () {
    const response = await get(reqUrl.chartGroup(), null)
    return response
  },
  getCityChart: async function (provinceName) {
    const getData = {
      provinceName: provinceName
    }
    const response = await get(reqUrl.chartCity(), getData)
    return response
  },
  getAllDynamics: async function () {
    const response = await get(reqUrl.getUserDynamics(), null)
    return response
  },
  getOnlineUsers: async function (isOnline) {
    const getData = {
      isOnline: isOnline
    }
    const response = await get(reqUrl.getOnlineUsers(), getData)
    return response
  },
  // #endregion

  // #region Book operations
  getBooks: async function (index, pageSize) {
    const getData = {
      pageIndex: index,
      pageSize: pageSize
    } 

    const response = await get(reqUrl.booksUrl(), getData)
    return response
  },
  updateBook: async function (bookInfo) {
    const getData = bookInfo
    const response = await post(reqUrl.updateBook(), getData)
    return response
  },
  deleteBook: async function (isbns) {
    const getData = {
      isbns: JSON.stringify(isbns)
    }
    const response = await post(reqUrl.deleteBook(), getData)
    return response
  },
  getTop3: async function () {
    const response = await get(reqUrl.getTop3(), null)
    return response
  },
  getWeekVisit: async function () {
    const response = await get(reqUrl.getWeekVisit(), null)
    return response
  },
  chartTagsOfUserBokks: async function () {
    const response = await get(reqUrl.chartTags(), null)
    return response
  },
  chartUserBook: async function () {
    const response = await get(reqUrl.chartUserBook(), null)
    return response
  }
  // #endregion
}

export default API