const express = require('express')
const router = express.Router()
const bookController = require('../../controllers/admin/book')

const routers = router
  .get('/all', bookController.queryAll)
  .get('/top', bookController.getTop3ByVisitCount)
  .post('/update', bookController.update)
  .post('/delete', bookController.deleteBooks)

module.exports = routers
