const reqUrl = require('./serverUrls')
const get = require('./request').default.get
const post = require('./request').default.post

const API = {
  login: async function (userName, password) {
    const postData = {
      userName: userName,
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