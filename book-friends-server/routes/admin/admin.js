const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin/adminController')

const routers = router
  .get('/all', adminController.queryAll)
  .post('/login', adminController.login)
  .post('/update', adminController.update)
  .post('/delete', adminController.deleteOne)
  .post('/register', adminController.register)

module.exports = routers
