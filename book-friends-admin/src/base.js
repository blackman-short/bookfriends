module.exports = function (Vue, options) {
  Vue.prototype.showError = function (errorMsg) {
    this.$confirm(errorMsg, '错误', {
      confirmButtonText: '确定',
      type: 'error',
      showCancelButton: false,
      center: true
    }).then()
  },

  Vue.prototype.showWarning = function (warning) {
    this.$confirm(errorMsg, '提示', {
      confirmButtonText: '确定',
      type: 'warning',
      showCancelButton: false,
      center: true
    }).then()
  }
}
