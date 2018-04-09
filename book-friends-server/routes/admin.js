const express = require('express')
const router = express.Router()
const loginController = require('../controllers/admin/loginController')

const routers = router
  .post('/register', loginController.register)

module.exports = routers
