module.exports = {
  isNumber (data) {
    return Object.prototype.toString.call(data).toLowerCase() === '[object string]'
  },
  isArray (data) {
    return Object.prototype.toString.call(data).toLowerCase() === '[object array]'
  },
  isJSON (data) {
    return Object.prototype.toString.call(data).toLowerCase() === '[object json]'
  }
}
