const request = require('request')

function post (url, data) {
  return new Promise((resolve, reject) => {
    let options = {
      url: url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: data
    }
    request(options, function (error, response, body) {
      if (error) {
        return reject(error)
      }
      if (!error && response.statusCode === 200) {
        resolve(response.body)
      } else { reject(new Error(response.body)) }
    })
  })
}

function get (requestUrl, data) {
  return new Promise((resolve, reject) => {
    let options = {
      url: requestUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      qs: data
    }
    request(options, function (error, response) {
      if (error) {
        return reject(error)
      }
      if (!error && response.statusCode === 200) {
        resolve(response.body)
      } else {
        reject(new Error(response.body))
      }
    })
  })
}

module.exports.post = post
module.exports.get = get
