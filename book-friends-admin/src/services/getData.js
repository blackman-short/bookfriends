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
  }
  // #endregion
}

export default API