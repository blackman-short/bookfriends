const validator = require('validator')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const bookManager = require('../managers/bookManager')

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
  let keyWord = req.query.keyWord
  let pageIndex = req.query.pageIndex

  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: (number) pageIndex')
    } else if (!keyWord) {
      keyWord = ''
    } else {
      pageIndex = parseInt(pageIndex)
      if (pageIndex <= 0) {
        throw new Error('Please provide valida parameter: (number) pageIndex > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      const loadResult = await bookManager.queryNewBooks(pageIndex, keyWord)
      response = loadResult
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_MANAGER + error.message }
    }
  }

  return res.status(200).send(response)
}

/**
 * Querys hot books.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getHotBooks (req, res, next) {
  let response = { errorCode: errorCode.SUCCESS }
  let keyWord = req.query.keyWord
  let pageIndex = req.query.pageIndex

  try {
    if (!pageIndex || (pageIndex && !validator.trim(pageIndex))) {
      throw new Error('Please provide parameter: (number) pageIndex')
    } else if (!keyWord) {
      keyWord = ''
    } else {
      pageIndex = parseInt(pageIndex)
      if (pageIndex <= 0) {
        throw new Error('Please provide valida parameter: (number) pageIndex > 0')
      }
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  // If has no parameter errors.
  if (response.errorCode === errorCode.SUCCESS) {
    try {
      const loadResult = await bookManager.queryHotBooks(pageIndex, keyWord)
      response = loadResult
    } catch (error) {
      response = { errorCode: errorCode.ERROR_MANAGER, errorMsg: errorMsg.ERROR_MANAGER + error.message }
    }
  }

  return res.status(200).send(response)
}

/**
 * Querys recommend books.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getRecommendBooks (req, res, next) {
  let response = { errorCode: errorCode.SUCCESS }
  let userId = req.query.userId

  try {
    if (!userId || (userId && !validator.trim(userId))) {
      throw new Error('Please provide parameter: user ID')
    } else {
      userId = validator.trim(userId)
    }
  } catch (error) {
    response = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: error.message }
  }

  if (response.errorCode === errorCode.SUCCESS) {

  }

  return res.status(200).send(response)
}

exports.saveBook = saveBook
exports.getNewBooks = getNewBooks
exports.getHotBooks = getHotBooks
exports.getRecommendBooks = getRecommendBooks
