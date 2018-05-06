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
    this.$confirm(warning, '提示', {
      confirmButtonText: '确定',
      type: 'warning',
      showCancelButton: false,
      center: true
    }).then()
  },
  Vue.prototype.success = function (msg) {
    this.$confirm(msg, '成功', {
      confirmButtonText: '确定',
      type: 'info',
      showCancelButton: false,
      center: true
    }).then()
  },
  Vue.prototype.showSuccess = function () {
    this.$message({
      message: '操作成功！',
      type: 'success'
      })
  }
}
