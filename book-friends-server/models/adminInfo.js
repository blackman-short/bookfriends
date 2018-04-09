const mongoose = require('mongoose')
const tools = require('../utils/tools')

const AdminSchema = new mongoose.Schema({
  adminName: { type: String },
  password: { type: String },
  createAt: { type: Date, default: tools.getCurrentTime() },
  updateAt: { type: Date, default: tools.getCurrentTime() },
  loginAt: { type: Date, default: tools.getCurrentTime() }
})

mongoose.model('admin', AdminSchema)
