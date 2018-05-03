const express = require('express')
const router = express.Router()
const bookController = require('../../controllers/admin/book')

const routers = router
  .get('/all', bookController.queryAll)
  .post('/update', bookController.update)
  .post('/delete', bookController.deleteBooks)

module.exports = routers
