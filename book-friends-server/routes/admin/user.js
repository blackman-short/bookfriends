const express = require('express')
const router = express.Router()
const userController = require('../../controllers/admin/user')

const routers = router
  .get('/all', userController.queryAll)
  .post('/delete', userController.delete)

module.exports = routers
