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
    this.$confirm(`^_^  ${warning}`, '提示', {
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
  Vue.prototype.showSuccess = function (msg, operationName) {
    const message = msg  || '操作成功！'
    let type = 'success'
    switch (operationName) {
      case 'add':
        break
      case 'delete':
        type = 'error'
        break
      case 'update':
        type = 'warning'
        break
      default: 
        break
    }
    this.$message({
      message: message,
      type: type
    })
  }
}
