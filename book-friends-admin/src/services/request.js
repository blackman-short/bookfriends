import Vue from 'vue'

const request = {
  post: async function (url, data) {
    const response = await Vue.http.post(url, data)
    if (!response || (response && !response.data)) {
      return { errorCode: '101', errorMsg: 'request is errored or response.datais null' }
    } else {
      return response.data
    }
  },
  get: async function (url, data) {
    if (url && data) {
      url += '?'
      for (let key in data) {
        url += key + '=' + data[key] + '&'
      }
      url = url.substring(0, url.lastIndexOf('&'))
    }
    
    const response = await Vue.http.get(url, null)
    if (!response || (response && !response.data)) {
      return { errorCode: '101', errorMsg: 'request is errored or response.data is null' }
    } else {
      return response.data
    }
  }
}

export default request
