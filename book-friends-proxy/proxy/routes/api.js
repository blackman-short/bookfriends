const express = require('express')
const router = express.Router()
const book = require('./bookInfo')

router.use('/book', book)

module.exports = router
