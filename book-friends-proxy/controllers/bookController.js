const logUtil = require('../utils/logUtil')
const types = require('../utils/types').types
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')

/**
 * Gets recommended books for user according to the user's hobbies
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getRecommendBooks (req, res, next) {
  let response = { errorCode: errorCode.SUCCESS }
  let hobbies = req.body.hobbies

  try {
    if (!hobbies || (hobbies && !types.isArray(hobbies))) {
      throw new Error('Please provide valid parameter: (Array) hobbies')
    } else {
      // Nothing to do.
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  }

  if (response.errorCode === errorCode.SUCCESS) {

  }

  return res.status(200).send(response)
}

exports.getRecommendBooks = getRecommendBooks
