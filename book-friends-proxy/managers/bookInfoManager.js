const validator = require('validator')
const types = require('../utils/types')
const logUtil = require('../utils/logUtil')
const errorMsg = require('../error/errorMsg')
const errorCode = require('../error/errorCode')
const bookDal = require('../dal/bookInfoDal')
const doubanConfig = require('../config/douban_config')
const commonRequest = require('../common/common_request')

/**
 * Querys recommend books from douban.
 * @param {*Array} hobbies
 */
async function queryRecommendBooks (hobbies) {
  const funcName = 'proxy: managers/book/queryRecommendBooks'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  if (!hobbies || !types.isArray(hobbies)) {
    return result
  }

  try {
    result = await getBooksByTags(hobbies)
    // sync operations.
    if (result.errorCode === errorCode.SUCCESS) {
      const books = result.data
      if (books && books.length > 0) {
        bookDal.saveBooks(books)
      }
    }
  } catch (error) {
    result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST + error.message }
    logUtil.logErrorMsg(funcName, result.errorMsg)
  }

  return result
}

async function getBooksByTags (hobbies) {
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  let books = []
  if (!hobbies || !types.isArray(hobbies) || hobbies.length <= 0) {
    return result
  }

  const divCount = doubanConfig.queryCount / hobbies.length
  const queryCount = divCount < 1 ? 1 : divCount
  for (let i = 0; i < hobbies.length; i++) {
    let queryResult = await getBookByTagFromDouBan(hobbies[i], queryCount)
    if (queryResult.errorCode === errorCode.SUCCESS) {
      const bs = queryResult.data
      if (bs && bs.length > 0) {
        bs.forEach(b => {
          books.push(b)
        })
      }
    } else {
      return queryResult
    }
  }

  result = { errorCode: errorCode.SUCCESS, data: books }

  return result
}

/**
 * Gets books from douban by tag.
 * @param {*String} hobby
 */
async function getBookByTagFromDouBan (hobby, queryCount) {
  const funcName = 'proxy: managers/book/getBookByTagFromDouBan'
  let result = { errorCode: errorCode.ERROR_PARAMETER, errorMsg: errorMsg.PARAMETER_ERRORMSG }
  let books = []

  if (!hobby || (hobby && !validator.trim(hobby))) {
    return books
  }

  let response = null
  try {
    const reqData = {
      tag: hobby,
      count: queryCount,
      start: 0
    }
    logUtil.logDebugMsg(funcName, `call douban server: url - ${doubanConfig.getBooksByTag()}; param - ${hobby}`)
    response = await commonRequest.get(doubanConfig.getBooksByTag(), reqData)
  } catch (error) {
    result = { errorCode: errorCode.ERROR_REQUEST, errorMsg: errorMsg.ERROR_REQUEST }

    if (error.code === 'ENOENT') {
      result.errorMsg = 'NetWork errored'
    }
    logUtil.logErrorMsg(funcName, result.errorMsg + JSON.stringify(error))
    return result
  }

  if (!response) {
    logUtil.logDebugMsg(funcName, 'get response is null from douban')
  } else {
    // Converts getted books.
    response = JSON.parse(response)
    response.books.forEach(b => {
      books.push(bookConvertor(b))
    })
  }

  result = { errorCode: errorCode.SUCCESS, data: books }
  return result
}

/**
 * Converts douBook to local book.
 * @param {*Object} douBook
 */
function bookConvertor (data) {
  let mapBook = null
  if (data) {
    mapBook = {
      isbn: data.isbn13,
      author: data.author, // 作者
      authorIntro: data.author_intro, // 作者介绍
      translator: data.translator, // 译者
      title: data.title, // 书名
      originTitle: data.origin_title, // 书的原名
      publisher: data.publisher, // 出版社
      pubdate: data.pubdate, // 出版时间
      images: data.images, // 图片路径集合： small, middle, large.
      price: data.price, // 价格： douban '89.00元'
      catalog: data.catalog, // 目录
      summary: data.summary, // 综述
      tags: data.tags,
      rating: data.rating.average == null ? 0 : Number(data.rating.average), // 评分
      ebookUrl: data.ebook_url == null ? '' : data.ebook_url // 电子书网址
    }
  }
  return mapBook
}

exports.queryRecommendBooks = queryRecommendBooks
