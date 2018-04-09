const validator = require('validator')
const errorCode = require('../error/errorCode')
const bookManager = require('../managers/bookInfo')

/**
 * Mock data.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function saveBook (req, res, next) {
  await bookManager.saveBook()
  // const loadData = await bookManager.queryCertainFields()
  // const loadData = await bookManager.pageQuery()
  return res.status(200).send({Code: 0, result: 'ok'})
}

/**
 * Querys new books.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getNewBooks (req, res, next) {
  let response = { errorCode: errorCode.SUCCESS }
  let pageSize = req.query.pageSize
  let pageIndex = req.query.pageIndex

  try {
    if (!pageSize || (pageSize && (pageSize && !validator.trim(pageSize)))) {
      throw new Error('Please provide parameter: (number)pageSize')
    } else if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: (number) pageIndex')
    } else {
      pageSize = Number(pageSize)
      pageIndex = Number(pageIndex)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {

  }

  return res.status(200).send(response)
}

exports.saveBook = saveBook
exports.getNewBooks = getNewBooks
