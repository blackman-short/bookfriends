const express = require('express')
const router = express.Router()
const admin = require('./admin')
const user = require('./user')
const book = require('./book')

router.use('/user', user)
router.use('/book', book)
router.use('', admin)

module.exports = router
