const mongoose = require('mongoose')
const dbConnection = require('../config/systemConfig').dbConnection
const logUtil = require('../utils/logUtil')

// Imports model.
require('./userInfo')
require('./bookInfo')
require('./adminInfo')
require('./commentInfo')
require('./userBookInfo')
require('./feedBackInfo')
require('./bookStoreInfo')
require('./userFriendInfo')
require('./userDynamicInfo')

exports.BookInfo = mongoose.model('book')
exports.UserInfo = mongoose.model('user')
exports.AdminInfo = mongoose.model('admin')
exports.CommentInfo = mongoose.model('comment')
exports.UserBookInfo = mongoose.model('userbook')
exports.FeedBackInfo = mongoose.model('feedback')
exports.BookStoreInfo = mongoose.model('bookstore')
exports.UserFriendInfo = mongoose.model('userfriend')
exports.UserDynamicInfo = mongoose.model('userDynamic')

// Connecting the mongoDB.
mongoose.Promise = global.Promise
mongoose.connect(dbConnection)
const db = mongoose.connection

/**
 * Conneting function.
 */
db.on('error', function () {
  console.log('Fails to connect mongoDB')
})
db.once('open', function () {
  console.log('Connect mongodb is successful')
  logUtil.logInfoMsg('Connect mongodb is successful')
})
