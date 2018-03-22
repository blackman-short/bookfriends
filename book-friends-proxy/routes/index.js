const express = require('express')
const router = express.Route()
const api = require('./api')

router.use('/api', api)
module.exports = router
