const express = require('express')
const router = express.Router()
const user = require('./user')
const book = require('./book')
const admin = require('./admin')

router.use('/user', user)
router.use('/book', book)
router.use('/admin', admin)

module.exports = router
