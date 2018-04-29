const mongoose = require('mongoose')
const tools = require('../utils/tools')

const AdminSchema = new mongoose.Schema({
  id: { type: String, default: tools.getUUID() },
  realName: { type: String },
  adminName: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  createAt: { type: Date, default: tools.getCurrentTime() },
  updateAt: { type: Date, default: tools.getCurrentTime() },
  loginAt: { type: Date, default: tools.getCurrentTime() }
})

mongoose.model('admin', AdminSchema)
