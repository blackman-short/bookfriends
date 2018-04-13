const express = require('express')
const router = express.Router()
const api = require('./api')

router.use('/bookcircle', api)
module.exports = router
