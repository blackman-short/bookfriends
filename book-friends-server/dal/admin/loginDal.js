const AdminInfo = require('../../models').AdminInfo

/**
 * Admin registers account.
 * @param {*String} adminName
 * @param {*String} password
 */
async function register (adminName, password) {
  let resultData = null

  if (adminName && password) {
    const admin = new AdminInfo({
      adminName: adminName,
      password: password
    })
    resultData = await admin.save()
  }

  return resultData
}

exports.register = register
