const mongoose = require('mongoose')
const dbConnection = require('../config/systemConfig').dbConnection

// Imports model.
require('./bookInfo')

exports.BookInfo = mongoose.model('book')

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
})
