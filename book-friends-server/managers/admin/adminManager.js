const errorCode = require('../../error/errorCode')
const adminDal = require('../../dal/admin/adminDal')

/**
 * Admin registers account.
 * @param {*String} adminName
 * @param {*String} password
 */
async function register (adminName, password) {
  let result = null

  try {
    const data = await adminDal.register(adminName, password)
    if (data) {
      result = { errorCode: errorCode.SUCCESS, data: data }
    }
  } catch (error) {

  }

  return result
}

exports.register = register
