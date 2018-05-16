const express = require('express')
const router = express.Router()
const userController = require('../../controllers/admin/user')

const routers = router
  .get('/all', userController.queryAll)
  .post('/delete', userController.delete)
  .get('/citychart', userController.getCityChart)
  .get('/chartgroup', userController.getChartGroup)

module.exports = routers
