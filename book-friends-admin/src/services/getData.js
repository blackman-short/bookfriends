const reqUrl = require('./serverUrls')
const get = require('./request').default.get
const post = require('./request').default.post

const API = {
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
  search: async function (userId) {
    const getData = {
      userId: '111'
    }
    const response = await get(reqUrl.searchUrl(), getData)
    return response
  }
}

export default API